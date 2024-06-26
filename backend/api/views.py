from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, ListAPIView
from .serializers import DoctorSerializer, PatientSerializer
from .models import Doctor, Patient
from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny, IsAuthenticated

class RegisterView(CreateAPIView):
    queryset = Doctor.objects.all()
    permission_classes = [AllowAny]
    serializer_class = DoctorSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = DoctorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['POST'])
def create_patient(request):
    if request.method == 'POST':
        serializer = PatientSerializer(data=request.data)
        if serializer.is_valid():
            patient = serializer.save(commit=False)
            patient.doctor = Doctor.objects.get(user=request.user)
            patient.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class CreatePatient(CreateAPIView):
    queryset = Patient.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = PatientSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = PatientSerializer(data=request.data)
        if serializer.is_valid():
            patient = serializer.save(commit=False)
            patient.doctor = Doctor.objects.get(user=request.user)
            patient.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        
#get_queryset потом прописать, чтобы выдавало по доктору
class ListPatient(ListAPIView):
    queryset = Patient.objects.all()
    permission_classes = [AllowAny]
    serializer_class = PatientSerializer
    
    
