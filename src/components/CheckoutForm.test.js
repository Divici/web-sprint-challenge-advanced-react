import React from "react";
import MutationObserver from 'mutationobserver-shim';
import { render, screen, waitFor } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";
import userEvent from "@testing-library/user-event";

// Write up the two tests here and make sure they are testing what the title shows

test("renders without errors", () => {
    render(<CheckoutForm/>);
});

test("shows success message on submit with form details", async () => {
    render(<CheckoutForm/>);

    const firstName = screen.getByLabelText(/First Name:/i);
    const lastName = screen.getByLabelText(/Last Name:/i);
    const address = screen.getByLabelText(/Address:/i);
    const city = screen.getByLabelText(/City:/i);
    const state = screen.getByLabelText(/State:/i);
    const zip = screen.getByLabelText(/Zip:/i);
    const button = screen.getByRole('button');

    userEvent.type(firstName, 'David');
    userEvent.type(lastName, 'Aihe');
    userEvent.type(address, '1234 Elm Street');
    userEvent.type(city, 'Washington');
    userEvent.type(state, 'DC');
    userEvent.type(zip, '20000');
    userEvent.click(button);

    await waitFor(()=>{
        const successLineOne = screen.queryByText(/You have ordered some plants! Woo-hoo!/i);
        const successLineTwo = screen.queryByText(/Your new green friends will be shipped to:/i);
        const nameDisplay = screen.queryByText('David Aihe');
        const addressLineOne = screen.queryByText('1234 Elm Street');
        const addressLineTwo = screen.queryByText('Washington, DC 20000');

        expect(successLineOne).toBeInTheDocument();
        expect(successLineTwo).toBeInTheDocument();
        expect(nameDisplay).toBeInTheDocument();
        expect(addressLineOne).toBeInTheDocument();
        expect(addressLineTwo).toBeInTheDocument();
    })
});

