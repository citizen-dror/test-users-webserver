class TimeZoneService {
  baseUSrl = 'https://localhost:44371/';
  public getAll = async (): Promise<Array<any> | undefined> => {
    // Default options are marked with *
    let url = this.baseUSrl + 'api/v1/timezone';
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
    });
    if (!response.ok) {
      return [];
    }
    return response.json(); // parses JSON response into native JavaScript objects
  };
  
}
export default new TimeZoneService();

