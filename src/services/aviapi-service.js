/* eslint consistent-return: "off" */
const BASE_URL = "https://front-test.beta.aviasales.ru";

const isJsonValid = (testData) => {
  try {
    JSON.stringify(testData);
  } catch (err) {
    return false;
  }
  return true;
};

class AviApiService {
  async getSearchID() {
    const searchIdUrl = `${BASE_URL}/search`;
    const response = await fetch(searchIdUrl);

    if (!response.ok) {
      throw new Error(
        `Could not receive data from ${searchIdUrl} , received ${response.status}`
      );
    }

    const body = await response.json();
    return body.searchId;
  }

  async getTickets() {
    let trie = 0;
    let body;
    // let parts = 0;
    const allTickets = [];
    const searchId = await this.getSearchID();
    const ticketsURL = `${BASE_URL}/tickets?searchId=${searchId}`;

    const getTicketsPack = async () => {
      try {
        const response = await fetch(ticketsURL);

        if (!response.ok) {
          trie += 1;
          // console.log(`trie No:${trie}`);
          // console.log(`calling again`);
          // console.log(`response.status: ${response.status}`);
          // console.log(allTickets);
          allTickets.push(...[]);
          // console.log(allTickets);
          await getTicketsPack();
          return;
        }

        if (trie === 3) {
          // console.log(`${trie} tries and no response, terminating`);
          // trie = 0;
          // throw new Error(
          //   `make ${trie} tries. Could not receive data from ${ticketsURL} , received ${response.status}`
          // );
          console.log(
            `make ${trie} tries. Could not receive data from ${ticketsURL} , received ${response.status}`
          );
          allTickets.push(...[]);
          return;
        }

        trie = 0;
        body = await response.json();

        if (isJsonValid(body)) {
          allTickets.push(...body.tickets);
        } else {
          throw new Error();
        }

        // allTickets.push(...body.tickets);
        // // console.log(body.tickets);

        if (body.stop !== true) {
          // parts +=1;
          // console.log(body);
          await getTicketsPack();
        }

        // console.log(body);
      } catch (err) {
        console.log(err);
        throw new Error(err);
      }
      return body;
    };

    await getTicketsPack();

    // console.log(allTickets);
    // allTickets.push(...result.tickets);
    // console.log(allTickets);
    // console.log(result.stop);

    // console.log(`${parts} array parts recieved`);
    return allTickets;
  }
}

const aviApiService = new AviApiService();
export default aviApiService;
