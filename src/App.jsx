import { useEffect, useState } from "react";
import "./App.css";
import Timer from "./Timer";
import LeaderbordButton from "./LeaderbordButton";
import Leaderboard from "./Leaderboard";

function App() {
  useEffect(() => {
    window.Telegram.WebApp.expand();
  }, []);

  const [page, setPage] = useState(0);

  const [days, setDays] = useState(11);

  const [hours, setHours] = useState("00:00:00");

  useEffect(() => {
    const targetDate = new Date("August 8, 2025 17:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        // Если время истекло
        setDays(0);
        setHours("00:00:00");
        return;
      }

      // Рассчитываем дни, часы, минуты, секунды
      const daysLeft = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hoursLeft = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutesLeft = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
      );
      const secondsLeft = Math.floor((distance % (1000 * 60)) / 1000);

      // Форматируем время в HH:MM:SS
      const formattedTime = [
        String(Math.floor(hoursLeft)).padStart(2, "0"),
        String(minutesLeft).padStart(2, "0"),
        String(secondsLeft).padStart(2, "0"),
      ].join(":");

      setDays(daysLeft);
      setHours(formattedTime);
    };

    // Запускаем сразу и затем каждую секунду
    updateCountdown();
    const intervalId = setInterval(updateCountdown, 1000);

    // Очистка интервала при размонтировании
    return () => clearInterval(intervalId);
  }, []);

  const [id, setId] = useState(0);

  useEffect(() => {
    // console.log(window);
    // console.log(window.Telegram);
    // console.log(window.Telegram.WebApp);
    // console.log(window.Telegram.WebApp.initDataUnsafe);
    // console.log(window.Telegram.WebApp.initDataUnsafe.user);
    setId(window.Telegram.WebApp.initDataUnsafe.user.id);
  }, []);

  return (
    <>
      {page == 0 ? (
        <>
          <Timer days={days} hours={hours} />
          <LeaderbordButton onClick={() => setPage(1)} />
        </>
      ) : (
        <>
          <Leaderboard id={id} onBack={() => setPage(0)} />
        </>
      )}
    </>
  );
}

export default App;
