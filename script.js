const botToken = '7809293668:AAEyMrFrbxp8Nu97QiglKuOi8mtM3x_IKnw'; // Замените на токен вашего бота
const defaultChatId = '-1001642760025'; // ID чата по умолчанию

document.getElementById('telegramForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const chatIdInput = document.getElementById('chatId').value.trim();
    const chatId = chatIdInput || defaultChatId; // Используем значение поля или ID по умолчанию
    const message = document.getElementById('message').value.trim();
    const photoInput = document.getElementById('photo');
    const file = photoInput.files[0];

    // Проверяем, чтобы хотя бы одно поле (текст или фото) было заполнено
    if (!message && !file) {
        alert('Введите текст сообщения или выберите фото.');
        return;
    }

    try {
        // Если есть текст, отправляем его
        if (message) {
            await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message
                })
            });
        }

        // Если есть фото, отправляем его
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
