import pandas as pd
import io
from transformers import pipeline

# Load zero-shot classifier once (globally for performance)
classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

CATEGORIES = [
    "Income", "Expense", "GST Sale", "Asset", "TDS Deducted"
]

def predict_transaction_type(description):
    result = classifier(description, CATEGORIES)
    return result['labels'][0]  # Most likely category

def parse_excel(file_bytes: bytes):
    df = pd.read_excel(io.BytesIO(file_bytes))

    # Auto-classify missing or vague Transaction Types
    df['Transaction Type'] = df.apply(
        lambda row: row['Transaction Type'] if pd.notnull(row['Transaction Type']) else predict_transaction_type(str(row['Description'])),
        axis=1
    )

    # Rule-based summaries based on updated transaction types
    income = df[df['Transaction Type'] == 'Income']['Amount'].sum()
    expenses = df[df['Transaction Type'] == 'Expense']['Amount'].sum()
    profit = income - expenses

    gst_sales = df[(df['Transaction Type'] == 'GST Sale') & (df.get('GST Included') == True)]['Amount'].sum()
    input_gst = df[(df['Transaction Type'] == 'Asset') & (df.get('GST Included') == True)]['Amount'].sum()
    gst_payable = gst_sales - input_gst

    tds_deducted = df.get('TDS Deducted', pd.Series([0]*len(df))).sum()
    estimated_tax = round(max(profit, 0) * 0.15, 2)

    return {
        "income": float(income),
        "expenses": float(expenses),
        "profit": float(profit),
        "estimated_tax": float(estimated_tax),
        "gst_payable": float(gst_payable),
        "tds_deducted": float(tds_deducted),
    }
