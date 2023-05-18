import { useEffect, useState } from "react";
import { getListZellerCustomers } from "./utils/getListZellerCustomers";
import {
  Box,
  Radio,
  RadioGroup,
  Spinner,
  Stack,
  VStack,
} from "@chakra-ui/react";
import "./App.css";
import { UserData } from "./utils/userInterface";

function App() {
  const [value, setValue] = useState<string>("1");
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const filteredUsers = users.filter((user: UserData) => {
    if (value === "1" && user.role === "ADMIN") {
      return true;
    }
    if (value === "2" && user.role === "MANAGER") {
      return true;
    }
    return false;
  });

  useEffect(() => {
    setLoading(true);
    getListZellerCustomers().then((response:UserData[]) => {
      setLoading(false);
      setUsers(response);
    });
  }, []);
  if (loading)
    return (
      <div className="spinner" >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          data-testid="spinner"
        ></Spinner>
      </div>
    );
  return (
    <Box className="mainWrapper">
      <Box className="childWrapper">
        <Box className="titles">User Types</Box>
        <RadioGroup onChange={setValue} value={value}>
          <Stack direction="column" className="radioWrapper">
            <Box className={`highlighted ${value === "1" && "addColor"}`}>
              <Radio value="1">Admin</Radio>
            </Box>
            <Box className={`highlighted ${value === "2" && "addColor"}`}>
              <Radio value="2">Manager</Radio>
            </Box>
          </Stack>
        </RadioGroup>
      </Box>
      <Box className="childWrapper">
        <Box className="titles">Admin Users</Box>
        <VStack spacing={4} align="stretch">
          {filteredUsers.map((user: UserData) => (
            <Box key={user.id} className="usersWrapper">
              <Box className="avatar" data-testid="user-avatar">
                <Box className="avatarChild">
                  {user.name.charAt(0).toUpperCase()}
                </Box>
              </Box>
              <Box className="nameAndRoleWrapper">
                <Box className="username" data-testid="user-name">{user.name}</Box>
                <Box>{user.role === "ADMIN" ? "Admin" : "Manager"}</Box>
              </Box>
            </Box>
          ))}
        </VStack>
      </Box>
    </Box>
  );
}

export default App;
