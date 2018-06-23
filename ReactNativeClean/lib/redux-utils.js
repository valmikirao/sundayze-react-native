import { connect } from 'react-redux';
import _ from 'lodash';
import {Alert} from 'react-native';

export function sdzConnect({base, pick = null, dispatch = {}, connect_ = connect}) {
  const mapStateToProps = pick ?
    (state) => {return _.pick(base(state), pick)}
    : base;

  const dispatch_ = dispatch;
  const mapDispatchToProps = (dispatch) => {
    let mappedProps = {};

    _.forOwn(dispatch_, (function_, key) => {
      mappedProps[key] = (...args) => dispatch(function_(...args))
    })

    return mappedProps;
  }

  const connector = connect_(mapStateToProps, mapDispatchToProps);

  return connector;
}

function assert(isTrue, ...errorArgs) {
  if (! isTrue) throw Error(...errorArgs);
}

function _test() {
  // not looking for mocha right now
  let connectStub;

  const connectArg = (...args) => connectStub(...args);

  let state = { foo : {
    bar : {
      bing : 'BING',
      bang : 'BANG',
      bong : 'BONG'
    },
    boing : 'BOING'
  }};

  connectStub = (mapStateToProps, _) => {

    let props = mapStateToProps(state);
    assert(props.bing === 'BING', '.bing != BING');
    assert(props.bang === 'BANG', '.bang != BANG');
    assert(
      props.bong === void(0) || props.boing === void(0),
      'bong or boing defined'
    );

  }

  sdzConnect({
    base: state => state.foo.bar,
    pick: ['bing', 'bang'],
    connect_: connectArg
  });

  connectStub = (mapStateToProps, _) => {
    let props = mapStateToProps(state);

    assert(props.bar.bing === 'BING', '.bing != BING');
    assert(props.bar.bong === 'BONG', '.bong != BONG');
    assert(props.boing === 'BOING', 'boing != BOING');
  };

  sdzConnect({
    base: state => state.foo,
    connect_: connectArg
  });

  connectStub = (_, mapDispatchToProps) => {
    const { foo } = mapDispatchToProps(x => assert(x === 5, 'bad dispatch'));

    foo(4)
  };

  sdzConnect({
    dispatch : {
      foo : (x) => x + 1
    },
    connect_: connectArg
  })

  Alert.alert(null, 'Passed Tests')
}

// _test()