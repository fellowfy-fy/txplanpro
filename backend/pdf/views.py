from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from xhtml2pdf import pisa
from django.http import HttpResponse
from io import BytesIO
import logging

logger = logging.getLogger(__name__)

def generate_pdf_function(auth, patient, financial_plan, total):
    styles = """
    <style>
      body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 20px;
      }
      h1, h2 {
          color: #333;
      }
      .header {
          background-color: #123789;
          padding: 10px;
          text-align: center;
      }
      .content {
          margin-top: 20px;
      }
      .content p {
          line-height: 1.6;
      }
      .items {
          margin-top: 20px;
          border-collapse: collapse;
          width: 100%;
      }
      .items th, .items td {
          border: 1px solid #ddd;
          padding: 8px;
      }
      .items th {
          background-color: #f2f2f2;
          text-align: left;
      }
      .slide {
          width: 100%;
          position: relative;
      }
      .slide img {
          width: 100%;
          height: auto;
      }
      .absolute {
          position: absolute;
      }
      .top-custom {
          top: 350px;
      }
      .left-12 {
          left: 3rem;
      }
      .text-white {
          color: white;
      }
      .p-2 {
          padding: 0.5rem;
      }
      .bg-transparent {
          background-color: transparent;
      }
      .text-6xl {
          font-size: 3.75rem;
      }
      .border {
          border: 1px solid white;
      }
      .rounded-3xl {
          border-radius: 1.5rem;
      }
      .p-3 {
          padding: 0.75rem;
      }
      .font-normal {
          font-weight: 400;
      }
      .font-light {
          font-weight: 300;
      }
      .text-4xl {
          font-size: 2.25rem;
      }
      .font-bold {
          font-weight: 700;
      }
      .text-center {
          text-align: center;
      }
      .font-extralight {
          font-weight: 200;
      }
      .text-5xl {
          font-size: 3rem;
      }
      .flex {
          display: flex;
      }
      .w-1-2 {
          width: 50%;
      }
      .p-5 {
          padding: 1.25rem;
      }
      .top-200px {
          top: 200px;
      }
      .left-120px {
          left: 7.5rem;
      }
      .top-500px {
          top: 500px;
      }
      .right-120px {
          right: 7.5rem;
      }
      .text-2xl {
          font-size: 1.5rem;
      }
      .py-5 {
          padding-top: 1.25rem;
          padding-bottom: 1.25rem;
      }
      .h-4in {
          height: 4in;
      }
      .items-center {
          align-items: center;
      }
      .w-1-3 {
          width: 33.3333%;
      }
      .text-3xl {
          font-size: 1.875rem;
      }
      .text-xl {
          font-size: 1.25rem;
      }
      .font-semibold {
          font-weight: 600;
      }
    </style>
    """

    html = f"""
    <html>
    <head>{styles}</head>
    <body>
        <div class="slide">
            <img src="{auth['clinic_photos'][0]['photo']}" alt="Intro Photo" />
            <div class="absolute top-custom left-12 text-white p-2">
                <div class="bg-transparent text-6xl border rounded-3xl p-3 font-normal">
                    {auth['static_text']['slide1']}
                </div>
                <div class="font-light text-4xl">
                    Patient: <span class="font-bold">{patient['name']}</span>
                </div>
            </div>
        </div>

        <div class="slide">
            <img src="{auth['clinic_photos'][1]['photo']}" alt="Vision Photo" />
            <div class="absolute top-200px left-120px text-white p-2">
                <div class="bg-transparent text-6xl border rounded-3xl p-3 font-normal">
                    {auth['static_text']['slide2']}
                </div>
            </div>
            <div class="absolute top-500px right-120px text-white p-2">
                <div class="bg-transparent text-2xl border rounded-3xl p-3 font-normal">
                    {auth['static_text']['slide3']}
                </div>
            </div>
        </div>

        <div class="slide text-center font-extralight text-5xl">
            <h1 class="p-5">Diagnosis Visualisation</h1>
            <div class="flex">
                <div class="w-1-2">
                    <h2 class="p-5">Upper jaw</h2>
                    <div>
                        <img src="{patient['photos'][0]['photo']}" alt="Patient Photo 1" class="w-full h-full p-10" />
                    </div>
                </div>
                <div class="w-1-2">
                    <div>
                        <h2 class="p-5">Lower jaw</h2>
                        <img src="{patient['photos'][1]['photo']}" alt="Patient Photo 2" class="w-full h-full p-10" />
                    </div>
                </div>
            </div>
        </div>

        <div class="slide text-center font-extralight text-5xl">
            <h1 class="p-5">Diagnosis Visualisation</h1>
            <div class="flex">
                <div class="w-1-2">
                    <h2 class="p-5">Left side</h2>
                    <div>
                        <img src="{patient['photos'][2]['photo']}" alt="Patient Photo 3" class="w-full h-full p-10" />
                    </div>
                </div>
                <div class="w-1-2">
                    <h2 class="p-5">Right side</h2>
                    <div>
                        <img src="{patient['photos'][3]['photo']}" alt="Patient Photo 4" class="w-full h-full p-10" />
                    </div>
                </div>
            </div>
        </div>

        <div class="slide">
            <img src="{auth['clinic_photos'][2]['photo']}" alt="Break Photo" />
            <div class="absolute top-200px right-12 text-white p-2">
                <div class="text-6xl py-5">Surgical & Implant Treatment</div>
                <div class="bg-transparent text-2xl border rounded-3xl p-3 font-normal">
                    {auth['static_text']['slide4']}
                </div>
            </div>
        </div>

        <div class="slide text-center items-center">
            <img src="{patient['photos'][4]['photo']}" alt="Patient Photo 5" class="w-full h-4in" />
            <div>
                <div class="flex text-black">
                    <div class="w-1-3">
                        <div class="text-3xl font-semibold py-5">Surgical & Implant Treatment</div>
                        <div class="text-xl font-extralight rounded-3xl">
                            {auth['static_text']['slide5']}
                        </div>
                    </div>
                    <div class="w-1-3">
                        <div class="text-3xl font-semibold py-5">Procedures</div>
                        <div class="text-xl font-extralight rounded-3xl">
                            {''.join([f"<div><strong>{treatment} [{len(teeth)}]</strong>: {', '.join(teeth)}</div>" for treatment, teeth in patient['formatted_treatment_plan'].items()])}
                        </div>
                    </div>
                    <div class="w-1-3">
                        <div class="text-3xl font-semibold py-5">Financial Plan</div>
                        <div class="text-xl font-extralight rounded-3xl">
                            {''.join([f"<div>{treatment} [{details['count']}] : ${details['cost']}</div>" for treatment, details in financial_plan.items()])}
                            <strong>Total: ${total}</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
    </html>
    """
    try:
        result = BytesIO()
        pdf = pisa.CreatePDF(html, dest=result)
        if pdf.err:
            logger.error(f'Error generating PDF: {pdf.err}')
        return result.getvalue(), pdf.err
    except Exception as e:
        logger.error(f'Exception occurred: {e}')
        return None, str(e)

class GeneratePDF(APIView):
    def post(self, request, format=None):
        data = request.data
        auth = data.get('auth', {})
        patient = data.get('patient', {})
        financial_plan = data.get('financial_plan', {})
        total = data.get('total', 0)
        
        pdf, error = generate_pdf_function(auth, patient, financial_plan, total)
        
        if error:
            return Response({'error': f'Error generating PDF: {error}'}, status=status.HTTP_400_BAD_REQUEST)

        response = HttpResponse(pdf, content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="patient_report.pdf"'
        return response
