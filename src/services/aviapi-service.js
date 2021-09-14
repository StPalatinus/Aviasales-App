/* eslint consistent-return: "off" */
const BASE_URL = "https://front-test.beta.aviasales.ru";

const TRIE = {
  initialValue: 0,
  lastTrie: 3,
};

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

  async getTickets(searchId) {
    let trie = TRIE.initialValue;
    let body;
    const ticketsURL = `${BASE_URL}/tickets?searchId=${searchId}`;

    const getTicketsPack = async (ID) => {
      try {
        const response = await fetch(ticketsURL);

        if (response.status === 404) {
          return { tickets: [], stop: true };
        }

        if (!response.ok) {
          trie += 1;
          await getTicketsPack(ID);
          return;
        }

        if (trie === TRIE.lastTrie) {
          return { tickets: [], stop: false };
        }

        trie = TRIE.initialValue;
        body = await response.json();

        if (isJsonValid(body)) {
          return body;
        }
        await getTicketsPack(ID);
      } catch (err) {
        throw new Error(err);
      }
    };

    const ticketsPack = await getTicketsPack(searchId);
    return ticketsPack;
  }
}

const aviApiService = new AviApiService();
export default aviApiService;
