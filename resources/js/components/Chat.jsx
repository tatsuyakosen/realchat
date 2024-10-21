import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Picker } from 'emoji-mart'; // 絵文字ピッカー
import 'emoji-mart/css/emoji-mart.css'; // スタイルのインポート


const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [showPicker, setShowPicker] = useState(false);

    useEffect(() => {
        const fetchMessages = async () => {
            const response = await axios.get('/api/messages');
            setMessages(response.data);
        };

        fetchMessages();

        // WebSocketリスナーを設定
        const channel = Echo.channel('chat');
        channel.listen('MessageSent', (e) => {
            setMessages((prevMessages) => [...prevMessages, e.message]);
        });
    }, []);

    const sendMessage = () => {
        const formData = new FormData();
        formData.append('content', content);
        if (image) {
            formData.append('image', image);
        }

        axios.post('/api/messages', formData)
            .then(response => {
                setMessages([...messages, response.data]);
                setContent('');
                setImage(null);
            });
    };

    const addEmoji = (emoji) => {
        setContent(content + emoji.native);
        setShowPicker(false);
    };

    return (
        <div className="chat-container">
            <div className="messages">
                {messages.map(message => (
                    <div key={message.id} className={message.is_read ? 'message read' : 'message'}>
                        {message.content}
                        {message.image && <img src={message.image} alt="message" />}
                    </div>
                ))}
            </div>
            <input value={content} onChange={e => setContent(e.target.value)} placeholder="Type a message..." />
            <input type="file" onChange={e => setImage(e.target.files[0])} />
            <button onClick={() => setShowPicker(!showPicker)}>😊</button>
            {showPicker && <Picker onSelect={addEmoji} />}
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;
