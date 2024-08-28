from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('books.urls')),  # Inclui as URLs da API
    path('', include('books.urls')),  # Serve o React app como antes
]
