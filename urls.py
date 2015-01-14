from django.conf.urls import patterns, url, include
from django.contrib import admin
from django.views.generic.base import RedirectView
from django.conf import settings
from core import urls
from django.views.generic.base import TemplateView
from dealersite.views import server_error

handler500 = server_error

admin.autodiscover()
urlpatterns = patterns('',
    url(r'^sitemap.xml$', TemplateView.as_view(template_name='seo/sitemap.xml')),
    url(r'^robots.txt$', TemplateView.as_view(template_name='seo/robots.txt')),
) + urls.urlpatterns

if settings.DEBUG:
    urlpatterns += patterns('',
        url(r'^500/$', TemplateView.as_view(template_name="500.html")),
        url(r'^404/$', TemplateView.as_view(template_name="404.html")),
        url(r'^new-cars/$',                    RedirectView.as_view(url='/inventory/search/?sort_by=list_price&stock_type=NEW')),
        url(r'^used-cars/$',                   RedirectView.as_view(url='/inventory/search/?sort_by=list_price&stock_type=USED')),
        url(r'^pre-owned-cars/$',              RedirectView.as_view(url='/inventory/search/?sort_by=list_price&stock_type=USED')),
        url(r'^/financing/calculator/$',       RedirectView.as_view(url='/financing/loan-calculator/')),
        url(r'^/financing/credit/$',           RedirectView.as_view(url='/financing/credit-application/')),
        url(r'^/insurance/car/$',              RedirectView.as_view(url='/insurance/car-insurance/')),
        url(r'^/insurance/home/$',             RedirectView.as_view(url='/insurance/home-insurance/')),
        url(r'^/service/$',                    RedirectView.as_view(url='/service/overview/')),
        url(r'^/about/careers/$',              RedirectView.as_view(url='/about/careers/overview/')),
        url(r'^/inventory/$',                  RedirectView.as_view(url='/inventory/search/')),
    )