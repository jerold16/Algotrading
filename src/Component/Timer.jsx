import React, { useEffect, useState } from 'react'

const Timer = () => {
  let [date, setdate] = useState(new Date());
  useEffect(() => {
    function updatetime() {
      setdate(new Date());
    }
    setInterval(() => {
      updatetime();
    }, 1000);
  }, []);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
 const formattedDateTime = date
  .toLocaleDateString(undefined, options)
  .replace(" at", " | ");

  return (
    <div>
          {formattedDateTime}
    </div>
  )
}

export default Timer