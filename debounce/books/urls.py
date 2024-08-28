from django.urls import path
from .views import index, BookListCreateAPIView

urlpatterns = [
    path('', index, name='index'),  # Serve o React App na raiz
    path('books/', BookListCreateAPIView.as_view(), name='book-list-create'),
]
