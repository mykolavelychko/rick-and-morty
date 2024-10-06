import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Character } from "../Character";
import { GetCharacterDocument } from "../../../generated/graphql";

const mocks = [
  {
    request: {
      query: GetCharacterDocument,
      variables: { id: "1" },
    },
    result: {
      data: {
        character: {
          id: "1",
          image: "",
          name: "Rick Sanchez",
          species: "Human",
          gender: "Male",
          location: {
            id: "1",
            name: "Earth (C-137)",
          },
          episode: [
            {
              id: "1",
              name: "Pilot",
            },
          ],
        },
      },
    },
  },
];

describe("Character Component", () => {
  it("renders loading state initially", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={["/character/1"]}>
          <Routes>
            <Route path="/character/:id" element={<Character />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error state", async () => {
    const errorMocks = [
      {
        request: {
          query: GetCharacterDocument,
          variables: { id: "1" },
        },
        error: new Error("An error occurred"),
      },
    ];

    render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <MemoryRouter initialEntries={["/character/1"]}>
          <Routes>
            <Route path="/character/:id" element={<Character />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Error loading character details")).toBeInTheDocument();
    });
  });

  it("renders character data after loading", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={["/character/1"]}>
          <Routes>
            <Route path="/character/:id" element={<Character />} />
          </Routes>
        </MemoryRouter>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
      expect(screen.getByText("Human")).toBeInTheDocument();
      expect(screen.getByText("Male")).toBeInTheDocument();
      expect(screen.getByText("Earth (C-137)")).toBeInTheDocument();
    });
  });

  
});
