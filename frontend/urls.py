from django.urls import path
from django.conf.urls import url
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
  path('', views.index)
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# isso da match em qualquer url e extende aos view.index
# que esta sendo moldada pelo react-router
urlpatterns += [

    # match the root
    url(r'^$', views.index),
    # match all other pages
    url(r'^(?:.*)/?$', views.index),]
   