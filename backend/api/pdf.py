from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib.units import inch
from PIL import Image
import os
from io import BytesIO

def generate_pdf_file(clinic_photos, patient_photos, break_photo, text_data):
    buffer = BytesIO()
    c = canvas.Canvas(buffer, pagesize=A4)
    width, height = A4

    # Add clinic photos as background
    if clinic_photos:
        clinic_photo_path = clinic_photos[0]
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

        for patient_photo_path in patient_photos:
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

        # Add break photo
        if break_photo:
            break_photo_image = Image.open(break_photo)
            break_photo_width, break_photo_height = break_photo_image.size
            break_photo_aspect = break_photo_height / float(break_photo_width)

            if break_photo_aspect > 1:
                # Taller than wide
                new_height = patient_photo_size
                new_width = patient_photo_size / break_photo_aspect
            else:
                # Wider than tall
                new_width = patient_photo_size
                new_height = patient_photo_size * break_photo_aspect

            c.drawImage(break_photo, text_x, patient_photo_y - new_height, new_width, new_height)
            patient_photo_y -= (new_height + inch)

        c.showPage()
    c.save()
    buffer.seek(0)
    return buffer
