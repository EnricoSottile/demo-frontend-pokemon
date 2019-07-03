
import PokeApi from "@/js/Interfaces/PokeApi/Api";
import Router from '@/js/Interfaces/PokeApi/Router';

const mockFn = jest.fn();

describe('App', () => {

  it('can be instantiated correctly', () => {
    window.idbDatabase = new mockFn();
    const pokeApi = new PokeApi(); 

    expect( pokeApi ).toBeInstanceOf(PokeApi);
    expect( pokeApi.router ).toBeInstanceOf(Router)
    expect( pokeApi.database ).toBeInstanceOf(mockFn)

  })

  it('fetches data and updates the route correctly when calling getAll', async() => {
    const db = {config: {INDEX: {objectStoreName: ''}}};
    window.idbDatabase = db;

    const pokeApi = new PokeApi(); 

    const mockGetLiveOrCached = jest.fn();
    const mockResultObject = {
      data: {
        next: 'test-route'
      }
    }
    mockGetLiveOrCached.mockReturnValue(mockResultObject)

    const mockRouterSetRoute = jest.fn();
    pokeApi._getLiveOrCached = mockGetLiveOrCached;
    pokeApi.router.setRoute = mockRouterSetRoute;
    await pokeApi.getAll();
    
    expect(pokeApi._getLiveOrCached).toBeCalled();
    expect(pokeApi.router.setRoute).toHaveBeenCalledWith("getAll","test-route");
  })

  it('Can have many more tests :)', () => {
    expect(true).toBeTruthy();
  })

})


