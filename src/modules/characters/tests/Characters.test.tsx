import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { MemoryRouter } from "react-router-dom";
import { Characters } from "../Characters";
import { GetCharactersDocument } from "../../../generated/graphql";

const mocks = [
  {
    request: {
      query: GetCharactersDocument,
      variables: { page: 1 },
    },
    result: {
      data: {
        characters: {
          results: [
            {
              id: "1",
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
          ],
          info: {
            count: 1,
            pages: 1,
            next: 2,
            prev: null,
          },
        },
      },
    },
  },
];

describe("Characters Component", () => {
  it("renders loading state initially", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <Characters />
        </MemoryRouter>
      </MockedProvider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error state", async () => {
    const errorMocks = [
      {
        request: {
          query: GetCharactersDocument,
          variables: { page: 1 },
        },
        error: new Error("An error occurred"),
      },
    ];

    render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <MemoryRouter>
          <Characters />
        </MemoryRouter>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Error loading characters")).toBeInTheDocument();
    });
  });

  it("renders character data after loading", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <Characters />
        </MemoryRouter>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
      expect(screen.getByText("Human")).toBeInTheDocument();
      expect(screen.getByText("Earth (C-137)")).toBeInTheDocument();
    });
  });
});
