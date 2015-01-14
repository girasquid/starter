import os

if os.environ.get("DEALERSITE_MODE") == "production":
    from dealersite.settings.production import *
    import dealersite.settings.production as base_settings
    RAVEN_CONFIG = {
        'dsn': 'https://c682978fa2bc4035aa09a8f5a2fad51f:f6620feed22d4ac7a7d638be5b427cd6@app.getsentry.com/35470',
    }
else:
    from dealersite.settings.local import *
    import dealersite.settings.local as base_settings

SITE_ID = 9
PROJECT_DIR = os.path.abspath(os.path.dirname(__file__))
PROJECT_NAME = 'go_auto'

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '63#l=hw$04@pr^z#*ij+o62==zm6@oa&c#k0^)z5l5^i@1wb!x'

TEMPLATE_DIRS = (
    os.path.join(PROJECT_DIR, 'templates'),
) + base_settings.TEMPLATE_DIRS

STATICFILES_DIRS = (
    ("img", os.path.join(PROJECT_DIR, 'static/img')),
    ("js", os.path.join(PROJECT_DIR, 'static/js')),
    ("css", os.path.join(PROJECT_DIR, 'static/css')),
    ("less", os.path.join(PROJECT_DIR, 'static/less')),
    ("fonts", os.path.join(PROJECT_DIR, 'static/fonts')),
    ("vendor", os.path.join(PROJECT_DIR, 'static/vendor')),
) + base_settings.STATICFILES_DIRS

STATIC_ROOT = os.path.join(PROJECT_DIR, 'static')

MEDIA_ROOT = os.path.join(PROJECT_DIR, 'media')

ALLOWED_HOSTS = ['*']

TIME_ZONE = 'America/Edmonton'

SHOWROOM_MAKES = ['Chrysler', 'Dodge', 'Fiat', 'Jeep', 'Ram', 'Ford', 'Kia', 'Honda', 'Hyundai', 'Jaguar', 'Land Rover', 'Lincoln', 'Acura', 'Infiniti', 'Nissan', 'Porsche', 'Volkswagen', 'Mazda', 'Mitsubishi']
SHOWROOM_INCENTIVES_POSTAL_CODE = 'T5H 2S8'
SHOWROOM_DEFAULT_FINANCE_TERM = 6*12  # in months
SHOWROOM_DEFAULT_FINANCE_RATE = 0.0499
SHOWROOM_DEFAULT_FINANCE_PAYMENTS_PER_YEAR = 26     # biweekly
INVENTORY_DEALERS = [5028, 272, 2516, 270, 384, 400, 187, 55, 783, 1539, 3532, 70, 18, 22, 57, 4101, 2988, 331, 56, 71, 66, 2987, 36, 2990, 192, 2991, 2992, 2772, 318, 2993, 4912, 4937, 3893]

INVENTORY_API_HOST = 'api.strathcom.com/search/2.0b'

INSTALLED_APPS = (''
    'core',
    'core.stores',
    'core.videocatalogue',
    'core.leads',
    'core.specials',
    'core.staff',
    'core.blackbook',
    'core.nps_survey',
    'core.constants',
    'core.dap',
) + base_settings.INSTALLED_APPS

MIDDLEWARE_CLASSES = (

) + base_settings.MIDDLEWARE_CLASSES

ROOT_URLCONF = 'urls'

SITE_META = {
    'name':'Go Auto',
    'phone': '780.777.7777',
    'logo': '/static/img/template/logos/dealers/go-auto.png',
    'email':'happytohelp@goauto.ca',
    'emaillink':'<a href="mailto:happytohelp@goauto.ca">happytohelp@goauto.ca</a>',
    'd_id':4175, #primary, happy to help
    'phone_required':False,
    'set_to_goauto_phone': True, #if this is set, this site will return goauto_phone in place of phone with the stores tags
    'happy_to_help_for_credit':True, #this overwrites the random dealer and forces it to only return 4175
    'makes':['Chrysler', 'Dodge', 'Fiat', 'Jeep', 'Ram', 'Ford', 'Kia', 'Honda', 'Hyundai', 'Jaguar', 'Land Rover', 'Lincoln', 'Acura', 'Infiniti', 'Nissan', 'Porsche', 'Volkswagen', 'Mazda'],
    'make': "Go Auto",
    'nps_dealers': ['272', '2516', '270', '384', '400', '187', '2988', '55', '783', '1539', '3532', '70', '56', '71', '22', '57', '4101', '331', '66', '2987', '36', '2990', '192', '18', '2991', '2992', '2772', '318', '2993', '4912'],
    'site_dealers': [5028, 272, 2516, 270, 384, 400, 187, 2988, 55, 783, 1539, 3532, 70, 56, 71, 22, 57, 4101, 331, 66, 2987, 36, 2990, 192, 18, 2991, 2992, 2772, 318, 999, 998, 997, 996, 995, 994, 2993, 993, 4912, 4937, 3893],
    'facebook':'https://www.facebook.com/goauto.ca',
    'googleplus':'https://plus.google.com/+goauto/posts',
    'twitter':'https://twitter.com/go_auto',
    'twittername':'@go_auto',
    'youtube':'https://www.youtube.com/user/goautotv',
    'googleverification':'YcuWIDIclwhtlJilRGxpK4SMA36Tnl0jZa5zXGYX424',
    'rss':'',
    'nps_db':'GP-A'
}