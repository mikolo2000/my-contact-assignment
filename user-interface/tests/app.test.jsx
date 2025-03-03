import {  render, screen } from "@testing-library/react";
import { it, expect, describe, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import App from "../src/App.jsx";
import "@testing-library/jest-dom/vitest";
import { HttpResponse, http } from 'msw'
import { server } from "../src/mocks/node.js";
import React from "react";
import { beforeAll, afterAll, afterEach } from "vitest";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


describe("App", () => {
 
  
  it("should render list of users", async () => {
    
    render(<App />);

    const users = await screen.findAllByRole("heading", {level: 5});
    

    expect(users).toHaveLength(3);
  });

  it("should show full details of selected contact", async () => {
    render(<App />);

    
    const users = await screen.findAllByRole("heading", { level: 5 });
  
    expect(users.length).toBeGreaterThan(1); 
  
    
    await userEvent.click(users[1]);
  

    expect(await screen.findByText(/first name/i)).toBeInTheDocument();
    expect(await screen.findByText(/last name/i)).toBeInTheDocument();
    expect(await screen.findByText(/male|female/i)).toBeInTheDocument(); 
    expect(await screen.findByText(/age/i)).toBeInTheDocument();
    expect(await screen.findByText(/email/i)).toBeInTheDocument();

    
  });

  it('should display error message', async () => {
    await server.use(
      http.get(
        "http://localhost:3000/users",
        () => HttpResponse.text('Server Error', {status: 500})
      )
    );
    render(<App />);
    screen.debug();

    const error = screen.findByText("error");
    
    expect(error).toBeInTheDocument;
    
  })

});
