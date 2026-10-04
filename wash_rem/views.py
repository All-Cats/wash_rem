import os
from django.http import JsonResponse
from django.shortcuts import render
from telegram import Bot

_bot = None


def _get_bot():
    global _bot
    if _bot is None:
        _bot = Bot(token=os.environ["TELEGRAM_BOT_TOKEN"])
    return _bot


def index(request):
    return render(request, "index.html")


def electrica(request):
    return render(request, "electrica.html")


def politika(request):
    return render(request, "politika.html")


async def send_notif(request):
    if request.method == "POST":
        mobile = request.POST.get("phone")
        if mobile:
            try:
                bot = _get_bot()
                await bot.send_message(chat_id=-1002341017964, text=mobile)
            except Exception:
                return JsonResponse({'success': False, 'message': 'Ошибка отправки. Попробуйте позже или позвоните нам.'}, status=500)
            return JsonResponse({'success': True, 'message': 'Заявка отправлена'})
        return JsonResponse({'success': False, 'message': 'Пожалуйста, введите номер телефона'}, status=400)
    return JsonResponse({'success': False, 'message': 'Неверный метод запроса'}, status=405)
