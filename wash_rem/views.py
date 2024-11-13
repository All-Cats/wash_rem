from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from telegram import Bot


def index(request):
    return render(request, "index.html")


async def send_notif(request):
    if request.method == "POST":
        mobile = request.POST.get("phone")
        if mobile:
            bot = Bot(token="8140712160:AAH7yrVwehAt-EvdfZsEyfdMPnE87Sa-ZSo")
            await bot.send_message(chat_id=-1002341017964, text=mobile)
            return JsonResponse({'success': True, 'message': 'Заявка отправлена'})
        return JsonResponse({'success': False, 'message': 'Пожалуйста, введите номер телефона'}, status=400)
    return JsonResponse({'success': False, 'message': 'Неверный метод запроса'}, status=405)
