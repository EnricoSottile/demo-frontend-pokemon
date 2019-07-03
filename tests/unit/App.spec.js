import { shallowMount, mount } from '@vue/test-utils'
import App from '@/js/App'

import PokeApi from "@/js/Interfaces/PokeApi/Api";

const loadCachedVisits = jest.fn()

const wrapper = shallowMount(App, {
  methods: { loadCachedVisits }
});


describe('App', () => {

  it('can be mounted correctly', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })


  it('loads default data correctly', () => {
    const data = wrapper.vm._data;
    const expectedData = [
      'slideCard', 
      'canRenderDetail', 
      'isLoadingList', 
      'isLoadingDetail',
      'pokeApi',
      'pokeList',
      'pokemon',
      'notifications',
      'visits' // from mixin
    ];

    expect( Object.keys(data).sort() ).toEqual(expectedData.sort());

    expect( wrapper.vm.slideCard ).toBeFalsy();
    expect( wrapper.vm.canRenderDetail ).toBeFalsy();
    expect( wrapper.vm.isLoadingList ).toBeFalsy();
    expect( wrapper.vm.isLoadingDetail ).toBeFalsy();
    expect( wrapper.vm.pokeApi ).toBeInstanceOf(PokeApi);
    expect( wrapper.vm.pokeList ).toEqual([]);
    expect( wrapper.vm.pokemon ).toEqual({});
    expect( wrapper.vm.notifications ).toEqual([]);
  })


  it('Calls loadCachedVisits on start', () => {
    expect(loadCachedVisits).toBeCalled();
  })


  it('calls the pokeApi getAll method and concats the returned array', async () => {
    const mockGetAll = jest.fn();
    const mockResultObject = {
      data: {
        results: ['test']
      }
    }

    mockGetAll.mockReturnValue(mockResultObject);
    wrapper.vm.pokeApi.getAll = mockGetAll;

    await wrapper.vm.getListData();
    await wrapper.vm.getListData();

    expect(mockGetAll).toBeCalled();  
    expect(wrapper.vm.pokeList).toEqual(['test', 'test']);

  })


  it('catches and notifies when the pokeApi getAll method throws an error', async () => {
    const mockNotify = jest.fn();
    const mockGetAll = jest.fn();
    mockGetAll.mockImplementation(() => {
      throw new Error();
    });

    wrapper.vm.$notify = mockNotify;
    wrapper.vm.pokeApi.getAll = mockGetAll;

    await wrapper.vm.getListData();
    expect(wrapper.vm.$notify).toBeCalled();  
  })

})