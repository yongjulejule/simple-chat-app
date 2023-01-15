import { useState } from 'react';
import { useParams } from 'react-router';
import style from './chat.module.css';

export const Chat = () => {
  const { id } = useParams();
  const [message, setMessage] = useState<string>('');
  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(message);
  };

  return (
    <>
      <div className={style.chat_main}>
        <h2>chat {id}</h2>
        <form className={style.input_box} onSubmit={handleSubmit}>
          <input
            className={style.input_box_input}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className={style.input_box_button} type="submit">
            send
          </button>
        </form>
      </div>
    </>
  );
};
