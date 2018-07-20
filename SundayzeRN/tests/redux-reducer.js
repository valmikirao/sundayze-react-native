import "mocha";
import { expect } from "chai";
import { createStore } from "redux";
import moment from 'moment-timezone';

import { Actions, Screens, reducer } from "../lib/redux-reducer";

describe('#redux-reducer', () => {
  let store = null;
  beforeEach(() => {
    store = createStore(reducer);
    store.dispatch(Actions.init());
  });

  it('#init', () => {
    let state = store.getState();

    expect(state).to.deep.equal(TestingStates.INIT);
  });

  describe('#fetch', () => {
    beforeEach(() => {
      const action = Actions.fetchedSharedItems([
          {
            "actor": "lara",
            "foreign_id": "",
            "id": "bbbbf06d-878c-11e8-9501-0a081e7097fe",
            "image": "pic-1531589914852.jpg",
            "note": "Hhhh",
            "object": "1531589914853",
            "origin": null,
            "target": "",
            "time": "2018-07-14T17:38:34.962750",
            "verb": "share"
          },
          {
            "actor": "lara",
            "foreign_id": "",
            "id": "f8be9097-8556-11e8-9efe-0a081e7097fe",
            "image": "pic-1531346922140.jpg",
            "note": "Jgjhg",
            "object": "1531346922140",
            "origin": null,
            "target": "",
            "time": "2018-07-11T22:08:42.172025",
            "verb": "share"
          }
        ]);
      store.dispatch(action);
    });

    it('#fetch', () => {
      let state = store.getState();

      state.data.sharedItems.forEach(item => {
        item.time = item.time.toISOString();
      });

      expect(state).to.deep.equal(TestingStates.FETCHED)
    });
  });
});
