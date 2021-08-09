const BASE_URL = "https://front-test.beta.aviasales.ru";

class AviApiService {
  async getSearchID() {
    const searchIDUrl = `${BASE_URL}/search`;
    const response = await fetch(searchIDUrl);

    if (!response.ok) {
      throw new Error(
        `Could not receive data from ${searchIDUrl} , received ${response.status}`
      );
    }

    const body = await response.json();
    return body.searchId;
  }

  async getTickets() {
    let trie = 0;
    // let parts = 0;
    const allTickets = [];
    const searchId = await this.getSearchID();
    const ticketsURL = `${BASE_URL}/tickets?searchId=${searchId}`;

    const getTicketsPack = async () => {
      const response = await fetch(ticketsURL);

      if (!response.ok) {
        trie += 1;
        // console.log(`trie No:${trie}`);
        // console.log(`calling again`);
        // console.log(`response.status: ${response.status}`);
        await getTicketsPack();
        return undefined;
      }

      if (trie === 3) {
        // console.log(`${trie} tries and no response, terminating`);
        trie = 0;
        throw new Error(
          `Could not receive data from ${ticketsURL} , received ${response.status}`
        );
      }

      trie = 0;
      const body = await response.json();

      if (body.stop !== true) {
        // parts +=1;
        allTickets.push(...body.tickets);
        // console.log(body);
        await getTicketsPack();
      }

      // console.log(body);
      return body;
    };

    const result = await getTicketsPack();

    allTickets.push(...result.tickets);
    // console.log(result.stop);

    // console.log(`${parts} array parts recieved`);
    return allTickets;
  }
}

const aviApiService = new AviApiService();
export default aviApiService;
