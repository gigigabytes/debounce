from django.shortcuts import render
from django.http import JsonResponse
from .models import Book

from rest_framework import generics
from .models import Book
from .serializers import BookSerializer

def index(request):
    return render(request, 'index.html')

def search_books(request):
    query = request.GET.get('q', '')
    if query:
        books = Book.objects.filter(title__icontains=query)
        results = [{"title": book.title, "author": book.author} for book in books]
    else:
        results = []
    return JsonResponse(results, safe=False)

def index(request):
    return render(request, 'index.html')


class BookListCreateAPIView(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        query = self.request.GET.get('q')
        if query:
            queryset = queryset.filter(title__icontains=query)
        return queryset

