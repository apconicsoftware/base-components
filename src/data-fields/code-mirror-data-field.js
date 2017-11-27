import React from 'react';
import { isNull, isUndefined } from 'lodash';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/theme/monokai.css';
import '../../../../../styles/code-mirror.css';

class CodeMirrorDataField extends React.Component {
  constructor(props) {
    super(props);
    this.onCodeChanges = this.onCodeChanges.bind(this);
    this.editorRefCallback = this.editorRefCallback.bind(this);
  }
  onCodeChanges(value) {
    this.props.onChange(this.props.docField, value);
  }
  editorRefCallback(ref) {
    if (ref) {
      const cm = ref.getCodeMirror();
      let { width, height } = this.props || '';
      width = width || 200;
      height = height || 200;
      cm.setSize(width, height);
    }
  }
  render() {
    const { displayName, value, readOnly } = this.props;
    const options = {
      lineNumbers: true,
      mode: 'javascript',
      lineWrapping: false,
      readOnly: readOnly || false,
    };
    const codeFieldValue = isNull(value) || isUndefined(value) ? '' : value;
    return (
      <div style={{ margin: '20px 0px' }}>
        <label
          style={{
            fontFamily: 'Roboto, sans-serif',
            fontSize: '12px',
            color: 'rgba(0, 0, 0, 0.498039)',
          }}
        >
          {displayName}
        </label>
        <div style={{ margin: '10px 0px' }}>
          <CodeMirror
            ref={this.editorRefCallback}
            value={codeFieldValue}
            options={options}
            onChange={this.onCodeChanges}
          />
        </div>
      </div>);
  }
}
CodeMirrorDataField.propTypes = {
  onChange: React.PropTypes.any,
  docField: React.PropTypes.any,
  displayName: React.PropTypes.any,
  value: React.PropTypes.any,
  readOnly: React.PropTypes.any,
};

export default CodeMirrorDataField;
