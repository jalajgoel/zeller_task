import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { getListZellerCustomers } from "./utils/getListZellerCustomers";

jest.mock("./utils/getListZellerCustomers");
const MockedFunction = getListZellerCustomers as jest.Mock;
describe("App", () => {

  beforeEach(() => {
    // Mock the implementation of getListZellerCustomers
    MockedFunction.mockImplementation(() => {
      return Promise.resolve([
        {
          id: 1,
          name: "John Doe",
          role: "ADMIN",
        },
        {
          id: 2,
          name: "Jane Smith",
          role: "MANAGER",
        },
      ]);
    });
  });

  test("renders the loading spinner initially", () => {
    render(<App />);
    const spinnerElement = screen.getByTestId("spinner");
    expect(spinnerElement).toBeInTheDocument();
  });
  test("renders the user types radio buttons", async () => {
    render(<App />);

    const adminRadioButton = await screen.findByLabelText("Admin");
    const managerRadioButton = await screen.findByLabelText("Manager");

    expect(adminRadioButton).toBeInTheDocument();
    expect(managerRadioButton).toBeInTheDocument();
  });
  
  test("renders the admin users when Admin radio button is selected", async () => {
    render(<App />);
    const adminRadioButton = await screen.findByLabelText("Admin");
    userEvent.click(adminRadioButton);

    const adminUserElements = screen.getAllByText("Admin");
    const managerUserElements = screen.queryAllByText("Manager");
    expect(adminUserElements.length).toBe(2);
    expect(managerUserElements.length).toBe(1);
  });

  test("renders the manager users when Manager radio button is selected", async () => {
    render(<App />);
    const managerRadioButton = await screen.findByLabelText("Manager");
    userEvent.click(managerRadioButton);
    const adminUserElements = screen.queryAllByText("Admin");
    const managerUserElements = screen.getAllByText("Manager");
    expect(adminUserElements.length).toBe(1);
    expect(managerUserElements.length).toBe(2);
  });

  test("renders the user avatars and names correctly", async () => {
    render(<App />);
    const adminRadioButton = await screen.findByLabelText("Admin");
    userEvent.click(adminRadioButton);
    const avatarElements = screen.getAllByTestId("user-avatar");
    const nameElements = screen.getAllByTestId("user-name");
    expect(avatarElements.length).toBe(1);
    expect(nameElements.length).toBe(1);
    expect(nameElements[0]).toHaveTextContent("John Doe");
  });
});
