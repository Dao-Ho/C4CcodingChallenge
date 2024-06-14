"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

export default function Home() {
  //initalize const
  const [partnerName, setPartnerName] = useState("");
  const [partnerBio, setPartnerBio] = useState("");
  const [partnerLogo, setPartnerLogo] = useState(null);

  const [fetchedPartnerData, setfetchedPartnerData] = useState(null);

  //supabase key: normally, this would be in an .env file and used as a variable/const, but for ease of access, it is directly delcared here:
  const supabaseUrl = "https://uwsapftobgquvcuawblq.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3c2FwZnRvYmdxdXZjdWF3YmxxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxODMyNzExMiwiZXhwIjoyMDMzOTAzMTEyfQ.ksRFbR54gf70ZzPk-N-_ih7aVyKQ7ZoxfUsNao3Ya-w";

  const supabase = createClient(supabaseUrl, supabaseKey);

  /**
   * method to fetch all data in our supabase table
   */
  const fetchPartnerDataFromSupabase = async () => {
    try {
      const { data, error } = await supabase.from("partners").select("*");
      console.log("Fetched data:", data); // Log the fetched data
      if (error) {
        console.error("Error fetching partner names from Supabase:", error);
      } else {
        setfetchedPartnerData(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //perform the following when the page loads/initialize
  useEffect(() => {
    // fetch all partners data from previous operations
    fetchPartnerDataFromSupabase();
  }, []);

  //function when submitted
  const handleSubmit = async (e) => {
    console.log("button clicked");
    e.preventDefault();

    if (!partnerLogo) {
      alert("No logo selected!");

      if (!partnerName) {
        alert("No name given");
      }

      if (!partnerBio) {
        alert("No bio given");
      }
    }

    //base 64 encoding of image:
    const reader = new FileReader();
    reader.readAsDataURL(partnerLogo);
    reader.onloadend = async () => {
      const convertedImage = reader.result;
      console.log(convertedImage);
    };
  };
  return (
    <main className="flex h-[100vh] w-[100vw] bg-[#f4f4f4] text-[#393939]">
      <div className="bg-[#f4f4f4] w-[70vw] h-[100vh]"></div>
      <div className="flex bg-[#fcfcfc] w-[30vw] h-[100vh] rounded-tl-[2vw] rounded-bl-[2vw] items-center justify-center flex-col">
        <h1 className="h-[8vh] font-extrabold text-[2vw]">Add a New Partner</h1>
        <form>
          <div className="w-full flex flex-col items-center">
            <div className="w-full">
              <div>
                <h1 className="font-bold text-[1vw] mt-[2vh]">Partner Name</h1>
                <input
                  type="text"
                  name="partnerName"
                  className="py-[1vh] border-[#f4f4f4] border-[2px] placeholder placeholder:
                placeholder:pl-[1vw] text:pl-[1vw] px-[1vw]"
                  placeholder="Partner Name"
                />
              </div>
              <div>
                <h1 className="font-bold text-[1vw] mt-[2vh]">Partner Bio</h1>
                <input
                  type="text"
                  name="partnerBio"
                  className="py-[1vh] border-[#f4f4f4] border-[2px] placeholder placeholder:
                placeholder:pl-[1vw] text:pl-[1vw] px-[1vw]"
                  placeholder="Partner Bio"
                />
              </div>
              <div>
                <h1 className="font-bold text-[1vw] mt-[2vh]">Partner Logo</h1>
                <input
                  type="file"
                  accept="image/*"
                  className="text-sm text-stone-500 mt-[1vh]
                  file:rounded-[1vw]
                  file:h-[4vh]
                  file:w-[10vw]
                  file:font-medium
                  file:bg-[#393939] file:text-[#ffffff]
                  hover:file:cursor-pointer hover:file:bg-[#ffffff]
                  hover:file:text-[#393939]"
                />
              </div>
            </div>
            <button
              type="submit"
              onSubmit={(e) => handleSubmit}
              className="
                  mt-[3vh]
                  h-[5vh]
                  w-[10vw]
                  font-medium
                  bg-[#393939] text-[#ffffff]
                  hover:border-[#393939]
                  hover:border-[0.2vw]
                  rounded-[0.5vw]
                  hover:cursor-pointer hover:bg-[#ffffff]
                  hover:text-[#393939]"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
