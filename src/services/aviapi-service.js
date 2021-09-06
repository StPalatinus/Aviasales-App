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
    const allTickets = [];
    const searchId = await this.getSearchID();
    const ticketsURL = `${BASE_URL}/tickets?searchId=${searchId}`;

    const getTicketsPack = async () => {
      try {
        const response = await fetch(ticketsURL);

        if (!response.ok) {
          trie += 1;
          allTickets.push(...[]);
          await getTicketsPack();
          return;
        }

        if (trie === 3) {
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

        if (body.stop !== true) {
          await getTicketsPack();
        }
      } catch (err) {
        throw new Error(err);
      }
      return body;
    };

    await getTicketsPack();
    return allTickets;
  }
}

const aviApiService = new AviApiService();
export default aviApiService;
