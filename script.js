const botToken = '7809293668:AAEyMrFrbxp8Nu97QiglKuOi8mtM3x_IKnw'; // Замените на токен вашего бота
const chatId = '5447904094'; // Замените на ваш chat ID

document.getElementById('telegramForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const message = document.getElementById('message').value;
    const photoInput = document.getElementById('photo');
    const file = photoInput.files[0];

    try {
        // Отправка текста
        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: message
            })
        });

        // Отправка фото (если выбрано)
        if (file) {
            const formData = new FormData();
            formData.append('chat_id', chatId);
            formData.append('photo', file);

            await fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
                method: 'POST',
                body: formData
            });
        }

        alert('Сообщение отправлено!');
        document.getElementById('telegramForm').reset();
    } catch (error) {
        console.error('Ошибка отправки:', error);
        alert('Ошибка отправки сообщения!');
    }
});
