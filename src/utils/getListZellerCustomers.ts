import { gql } from "@apollo/client";
import client from "./apolloClient";
import { UserData } from "./userInterface";


export const getListZellerCustomers = async (): Promise<UserData[]> => {
    try {
      const response = await client.query({
        query: gql`
          query ListZellerCustomers {
            listZellerCustomers {
              items {
                email
                id
                name
                role
              }
            }
          }
        `,
      });
      return response.data.listZellerCustomers.items
    } catch (error) {
      console.error("Error fetching Zeller customers:", error);
      throw error;
    }
  };