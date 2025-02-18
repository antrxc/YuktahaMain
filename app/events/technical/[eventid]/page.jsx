"use client";

import Navbar from "@/components/Navbar";
import { BackgroundBeams } from "@/components/acertinity_ui/background-beams.jsx";
import { useParams } from "next/navigation";
import React from "react";

const TechnicalEventDetail = () => {
  const [event, setEvent] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const { eventid } = useParams();
  const numericEventId = eventid ? parseInt(eventid, 10) : null;

  React.useEffect(() => {
    if (!numericEventId) return; // Prevent fetch call if eventid is invalid

    // const fetchEvent = async () => {
    //   try {
    //     const response = await fetch(
    //       `/api/tevents/getTevents?eventId=${numericEventId}`
    //     );
    //     if (!response.ok) {
    //       console.log("Response of the error: ", response);
    //       throw new Error("Event not found");
    //     }
    //     const data = await response.json();
    //     setEvent(data.event);
    //   } catch (err) {
    //     setError(err.message);
    //     console.error("Error fetching event:", err);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    const fetchEvent = async () => {
      try {
        const response = await fetch(
          `/api/tevents/getTevents?eventId=${numericEventId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Handle API errors
        if (data.error) {
          throw new Error(data.error);
        }

        // Check if the event data exists in the response
        if (!data.event) {
          throw new Error("Event data not found in the response");
        }

        setEvent(data.event);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching event:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [numericEventId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="flex justify-center items-center h-[calc(100vh-64px)]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar />
        <div className="flex justify-center items-center h-[calc(100vh-64px)]">
          <div className="text-white text-xl">{error || "Event not found"}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-800 to-neutral-900">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-8 shadow-xl">
          {event.outer_Img && (
            <div className="mb-8 flex justify-center">
              {/* Image Container with 16:9 Aspect Ratio */}
              <div className="max-w-5xl aspect-video overflow-hidden rounded-xl">
                <img
                  src={event.outer_Img}
                  alt={event.name}
                  className="w-full h-full object-cover "
                />
              </div>
            </div>
          )}

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">{event.name}</h1>
            <p className="text-gray-400 text-lg">{event.desc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-white mb-3">
                  Event Details
                </h2>
                <div className="space-y-2">
                  <p className="text-gray-400">
                    <span className="font-medium text-white">Department:</span>{" "}
                    {event.dept}
                  </p>
                  <p className="text-gray-400">
                    <span className="font-medium text-white">Date:</span>{" "}
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-400">
                    <span className="font-medium text-white">Time:</span>{" "}
                    {event.time}
                  </p>
                  <p className="text-gray-400">
                    <span className="font-medium text-white">Venue:</span>{" "}
                    {event.venue}
                  </p>
                  <p className="text-gray-400">
                    <span className="font-medium text-white">Fees:</span> ₹
                    {event.fees}
                  </p>
                  {/* <p className="text-gray-400">
                    <span className="font-medium text-white">
                      Availability:
                    </span>{" "}
                    {event.availability}/{event.limit} spots
                  </p> */}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white mb-3">
                  Event Coordinators
                </h2>
                <p className="text-gray-400">
                  <span className="font-medium text-white">Name:</span>{" "}
                  {event.ecn}
                </p>
                <p className="text-gray-400">
                  <span className="font-medium text-white">Contact:</span>{" "}
                  {event.ecc}
                </p>

                {event.ecn2 && event.ecc2 && (
                  <>
                    <p className="text-gray-400">
                      <span className="font-medium text-white">Name:</span>{" "}
                      {event.ecn2}
                    </p>
                    <p className="text-gray-400">
                      <span className="font-medium text-white">Contact:</span>{" "}
                      {event.ecc2}
                    </p>
                  </>
                )}
              </div>
              {!event.open && (
                <div>
                  <h2 className="text-xl font-semibold text-white mb-3">
                    Registration Status:
                  </h2>
                  <p className="text-gray-400">
                    Registration is closed. Try Onspot if possible.
                  </p>
                </div>
              )}
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">
                Requirements from participants
              </h2>
              <p className="text-gray-400 whitespace-pre-line">{event.pr}</p>
            </div>
          </div>

          <div className="mt-8">
            <button
              disabled={!event.open}
              className={`px-8 py-3 rounded-lg text-white transition-opacity ${
                event.open && event.availability > 0
                  ? "bg-gradient-to-l from-[#3282b8] to-[#f05454] hover:opacity-90"
                  : "bg-gray-600 cursor-not-allowed"
              }`}
            >
              {!event.open
                ? "Registration Closed"
                : event.availability === 0
                ? "Event Full"
                : "Register Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalEventDetail;
