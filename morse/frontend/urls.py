from django.urls import path
from django.conf.urls import url
from . import views
urlpatterns = [
  path('', views.index)
]

# isso da match em qualquer url e extende aos view.index
# que esta sendo moldada pelo react-router
urlpatterns += [
    # match the root
    url(r'^$', views.index),
    # match all other pages
    url(r'^(?:.*)/?$', views.index),]