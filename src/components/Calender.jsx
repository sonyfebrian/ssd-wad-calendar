import { useState, useEffect } from "react";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
function getRandomColor() {
  const colors = ["#FF5733", "#33FF57", "#5733FF"];
  return colors[Math.floor(Math.random() * colors.length)];
}
function Calender() {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [noOfDays, setNoOfDays] = useState([]);
  const [blankDays, setBlankDays] = useState([]);
  const [events, setEvents] = useState([]);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventEmail, setEventEmail] = useState("");
  const [eventTheme, setEventTheme] = useState(getRandomColor());
  const [openEventModal, setOpenEventModal] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);

  //input email validation
  const handleInputChange = (event) => {
    const newEmail = event.target.value;
    setEventEmail(newEmail);
    // Validate the email format using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(newEmail));
  };

  //time
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  //day
  const getNoOfDays = () => {
    let daysInMonth = new Date(year, month + 1, 0).getDate();
    let dayOfWeek = new Date(year, month).getDay();
    let blankDaysArray = Array.from({ length: dayOfWeek }, (_, i) => i + 1);
    let daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    setBlankDays(blankDaysArray);
    setNoOfDays(daysArray);
  };
  useEffect(() => {
    initDate();
    getNoOfDays();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initDate = () => {
    let today = new Date();
    setMonth(today.getMonth());
    setYear(today.getFullYear());
  };

  const isToday = (date) => {
    const today = new Date();
    const d = new Date(year, month, date);
    return today.toDateString() === d.toDateString();
  };

  //modal
  const showEventModal = (date) => {
    setOpenEventModal(true);
    setEventDate(new Date(year, month, date).toDateString());
  };

  //add event
  const addEvent = () => {
    if (eventTitle === "") {
      return;
    }

    if (eventEmail === "") {
      return;
    }

    const newEvent = {
      event_date: eventDate,
      event_title: eventTitle,
      event_theme: eventTheme,
      event_email: eventEmail,
    };

    setEvents([...events, newEvent]);

    setEventTitle("");
    setEventEmail("");
    setEventDate("");
    setEventTheme(getRandomColor());

    setOpenEventModal(false);
  };

  // delete
  const handleDeleteEvent = (eventIndex) => {
    const updatedEvents = [...events];

    updatedEvents.splice(eventIndex, 1);

    setEvents(updatedEvents);
  };

  return (
    <>
      <div className="antialiased sans-serif bg-gray-100 ">
        {" "}
        <div className="container mx-auto px-4 py-2 md:py-24">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="flex items-center justify-between py-2 px-6">
              <div>
                <span className="text-lg font-bold text-gray-800">
                  {MONTH_NAMES[month]}
                </span>
                <span className="ml-1 text-lg text-gray-600 font-normal">
                  {year}
                </span>
              </div>
              <div
                className="border rounded-lg px-1"
                style={{ paddingTop: "2px" }}
              >
                <button
                  type="button"
                  className={`leading-none rounded-lg transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 items-center ${
                    month === 0 ? "cursor-not-allowed opacity-25" : ""
                  }`}
                  disabled={month === 0}
                  onClick={() => {
                    setMonth(month - 1);
                    getNoOfDays();
                  }}
                >
                  <svg
                    className="h-6 w-6 text-gray-500 inline-flex leading-none"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <div className="border-r inline-flex h-6"></div>
                <button
                  type="button"
                  className={`leading-none rounded-lg transition ease-in-out duration-100 inline-flex items-center cursor-pointer hover:bg-gray-200 p-1 ${
                    month === 11 ? "cursor-not-allowed opacity-25" : ""
                  }`}
                  disabled={month === 11}
                  onClick={() => {
                    setMonth(month + 1);
                    getNoOfDays();
                  }}
                >
                  <svg
                    className="h-6 w-6 text-gray-500 inline-flex leading-none"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="-mx-1 -mb-1">
              <div className="flex flex-wrap" style={{ marginBottom: "-40px" }}>
                {DAYS.map((day, index) => (
                  <div
                    key={index}
                    style={{ width: "14.26%" }}
                    className="px-2 py-2"
                  >
                    <div className="text-gray-600 text-sm uppercase tracking-wide font-bold text-center">
                      {day}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap border-t border-l mt-10">
                {blankDays.map((blankday, index) => (
                  <div
                    key={index}
                    style={{ width: "14.28%", height: "120px" }}
                    className="text-center border-r border-b px-4 pt-2"
                  ></div>
                ))}
                {noOfDays.map((date, dateIndex) => (
                  <div
                    key={dateIndex}
                    style={{ width: "14.28%", height: "120px" }}
                    className="px-4 pt-2 border-r border-b relative"
                  >
                    <div
                      onClick={() => showEventModal(date)}
                      className={`inline-flex w-6 h-6 items-center justify-center cursor-pointer text-center leading-none rounded-full transition ease-in-out duration-100 ${
                        isToday(date)
                          ? "bg-blue-500 text-white"
                          : "text-gray-700 hover:bg-blue-200"
                      }`}
                    >
                      {date}
                    </div>
                    <div
                      style={{ height: "80px" }}
                      className="overflow-y-auto mt-1"
                    >
                      {events
                        .filter(
                          (event) =>
                            new Date(event.event_date).toDateString() ===
                            new Date(year, month, date).toDateString()
                        )
                        .map((event, eventIndex) => (
                          <div
                            key={eventIndex}
                            style={{ backgroundColor: event.event_theme }}
                            className="px-2 py-1 rounded-lg relative flex flex-col group text-left mt-1 overflow-hidden border"
                          >
                            <p className="text-sm truncate leading-tight">
                              {event.event_title}
                            </p>
                            <p className="text-sm truncate leading-tight">
                              {event.event_email}
                            </p>
                            <p className="text-sm truncate leading-tight">
                              {currentTime}
                            </p>
                            <button
                              className="text-red-600 hover:text-red-800 font-semibold mt-1"
                              onClick={() => handleDeleteEvent(eventIndex)}
                            >
                              Delete
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
              {openEventModal && (
                <>
                  <div
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
                    className="fixed z-50 top-0 right-0 left-0 bottom-0 h-full w-full"
                  >
                    <div className="p-4 max-w-4xl mx-auto relative absolute left-0 right-0 overflow-hidden mt-24">
                      <div
                        className="shadow absolute  top-0 right-0 w-10 h-10 rounded-full bg-white text-gray-500 hover:text-gray-800 inline-flex items-center justify-center cursor-pointer"
                        onClick={() => setOpenEventModal(false)}
                      >
                        <svg
                          className="fill-current w-6 h-6"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M16.192 6.344L11.949 10.586 7.707 6.344 6.293 7.758 10.535 12 6.293 16.242 7.707 17.656 11.949 13.414 16.192 17.656 17.606 16.242 13.364 12 17.606 7.758z" />
                        </svg>
                      </div>
                    </div>
                    <div className="shadow max-w-4xl mx-auto rounded-lg bg-white overflow-hidden w-full block p-8">
                      <h2 className="font-bold  text-2xl mb-6 text-gray-800 border-b pb-2">
                        Add Event Details
                      </h2>
                      <div className="mb-4 text-left">
                        <label className="text-gray-800 block mb-1 font-bold text-sm tracking-wide">
                          Event Name
                        </label>

                        <input
                          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                          type="text"
                          value={eventTitle}
                          onChange={(e) => setEventTitle(e.target.value)}
                        />
                      </div>

                      <div className="mb-4 text-left">
                        <label className="text-gray-800 block mb-1 font-bold text-sm tracking-wide">
                          Email
                        </label>
                        <input
                          className={`border ${
                            isValidEmail ? "border-gray-300" : "border-red-500"
                          } bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500`}
                          type="email"
                          placeholder="Enter your email"
                          value={eventEmail}
                          onChange={handleInputChange}
                        />
                        {!isValidEmail && (
                          <p className="text-red-500 text-sm mt-1">
                            Please enter a valid email address.
                          </p>
                        )}
                      </div>
                      <div className="mt-8 text-right">
                        <button
                          type="button"
                          className="bg-white hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded-lg shadow-sm mr-2"
                          onClick={() => setOpenEventModal(!openEventModal)}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 border border-gray-700 rounded-lg shadow-sm"
                          onClick={addEvent}
                        >
                          Save Event
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Calender;
