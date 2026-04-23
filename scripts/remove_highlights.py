
import sys
import os
from pypdf import PdfReader, PdfWriter

def remove_highlights(input_path):
    """
    Removes all annotations (including highlights) from a PDF file.
    
    Args:
        input_path (str): The path to the input PDF file.
    """
    if not os.path.exists(input_path):
        print(f"Error: File not found at {input_path}")
        return

    output_path = os.path.splitext(input_path)[0] + "_clean.pdf"

    try:
        reader = PdfReader(input_path)
        writer = PdfWriter()

        for page in reader.pages:
            if "/Annots" in page:
                del page["/Annots"]
            writer.add_page(page)

        with open(output_path, "wb") as f:
            writer.write(f)

        print(f"Successfully removed highlights. Cleaned file saved to: {output_path}")

    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: uv run remove_highlights.py <input_pdf_path>")
    else:
        remove_highlights(sys.argv[1])
