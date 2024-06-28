from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib.units import inch
from PIL import Image

def create_pdf(output_path, clinic_photo_path, patient_photo_paths, text_data):
    c = canvas.Canvas(output_path, pagesize=A4)
    width, height = A4

    # Add clinic photo as background
    clinic_photo = Image.open(clinic_photo_path)
    clinic_photo_width, clinic_photo_height = clinic_photo.size
    clinic_photo_aspect = clinic_photo_height / float(clinic_photo_width)

    c.drawImage(clinic_photo_path, 0, height - (width * clinic_photo_aspect), width, width * clinic_photo_aspect)

    # Add text on top of clinic photo
    c.setFont("Helvetica", 12)
    text_x = inch
    text_y = height - (width * clinic_photo_aspect) + inch

    for line in text_data:
        c.drawString(text_x, text_y, line)
        text_y -= 14  # Adjust this value based on your font size

    # Add patient photos and text
    patient_photo_y = text_y - inch  # Adjust starting Y position
    patient_photo_size = 2 * inch  # Example size for patient photos

    for patient_photo_path in patient_photo_paths:
        patient_photo = Image.open(patient_photo_path)
        patient_photo_width, patient_photo_height = patient_photo.size
        patient_photo_aspect = patient_photo_height / float(patient_photo_width)

        if patient_photo_aspect > 1:
            # Taller than wide
            new_height = patient_photo_size
            new_width = patient_photo_size / patient_photo_aspect
        else:
            # Wider than tall
            new_width = patient_photo_size
            new_height = patient_photo_size * patient_photo_aspect

        c.drawImage(patient_photo_path, text_x, patient_photo_y - new_height, new_width, new_height)
        patient_photo_y -= (new_height + inch)

    c.showPage()
    c.save()

# Example usage
clinic_photo_path = "path/to/clinic_photo.jpg"
patient_photo_paths = [
    "path/to/patient_photo1.jpg",
    "path/to/patient_photo2.jpg"
]
text_data = [
    "Clinic Report",
    "Date: 2024-06-25",
    "Doctor: Dr. John Doe",
    "Patient: Jane Doe",
    "Diagnosis: Healthy",
    "Treatment Plan: Regular Checkups"
]

create_pdf("clinic_report.pdf", clinic_photo_path, patient_photo_paths, text_data)
