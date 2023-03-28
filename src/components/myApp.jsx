import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddForm.css";

function AddForm() {
  const [businessName, setBusinessName] = useState("");
  const [summary, setSummary] = useState(null);
   
  const fetchData = async (businessName) => {
  //    const apiKey = process.env[`REACT_APP_OpenAIAPIkey`];

  const apiKey = process.env['OpenAIAPIkey'];
    console.log("API KEY", apiKey);
const endpoint = "https://api.openai.com/v1/chat/completions";
    
    try {
      const response = await axios.post(
        endpoint,
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: `Give me a summary of a company called ${businessName} with information about their Financials, Business Model, Target Consumer Group, and a Content Marketing strategy. Please provide the information in JSON format like this: {"financials": "", "business_model": "", "target_consumer_group": "", "content_marketing_strategy": ""}`,
            },
          ],
          max_tokens: 3000,
        },
        {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        }
        }
      );

      if (response.data.choices) {
        const summaryJson = JSON.parse(response.data.choices[0].message.content);
       
        setSummary(summaryJson);
         console.log("output", summary)
      }
    } catch (error) {
      console.error("Error fetching data from ChatGPT:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData(businessName);
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label htmlFor="businessName">Business Name</label>
        <input
          id="businessName"
          value={businessName}
          onChange={(event) => setBusinessName(event.target.value)}
        />

        <button type="submit">Get Summary</button>
      </form>

      {summary && (
        <div className="summaryBox">
          <h3>Summary</h3>
          <div>
            {summary.company_name}
          </div>
          <div>
            <strong>Business Model:</strong> {summary.business_model}
          </div>
          <div>
            <strong>Target Consumer Group:</strong> {summary.target_consumer_group}
          </div>
          <div>
            <strong>Content Marketing Strategy:</strong> {summary.content_marketing_strategy}
          </div>
        </div>
      )}
    </main>
  );
}

export default AddForm;
