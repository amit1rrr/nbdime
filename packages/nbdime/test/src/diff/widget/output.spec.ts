// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

import expect = require('expect.js');

import {
  nbformat
} from '@jupyterlab/services';

import {
  RenderMime
} from 'jupyterlab/lib/rendermime';

import {
    OutputDiffModel
} from '../../../../src/diff/model/output';

import {
    OutputPanel
} from '../../../../src/diff/widget/output';


describe('diff', () => {

  describe('widget', () => {

    describe('OutputPanel', () => {

      describe('#isTrustSignificant', () => {

        let rendermime = new RenderMime({items: RenderMime.getDefaultItems()});

        let model: OutputDiffModel;
        let base: nbformat.IExecuteResult;
        let remote: nbformat.IDisplayData;
        beforeEach(() => {
          base = {
              output_type: 'execute_result',
              data: {},
              execution_count: 4,
              metadata: {}
            };
          remote = {
              output_type: 'display_data',
              data: {},
              metadata: {}
            };
          model = new OutputDiffModel(base, remote);
        });

        it('should say insignificant for plain text', () => {
          base.data['text/plain'] = '365.0';
          debugger;
          let significant = OutputPanel.isTrustSignificant(model, rendermime);
          expect(significant).to.be(false);
        });

        it('should say insignificant for plain text in remote', () => {
          remote.data['text/plain'] = '365.0';
          let significant = OutputPanel.isTrustSignificant(model, rendermime);
          expect(significant).to.be(false);
        });

        it('should say significant for untrusted html', () => {
          base.data['text/html'] = '<html><body><script>alert("wee");</script></body></html';
          let significant = OutputPanel.isTrustSignificant(model, rendermime);
          expect(significant).to.be(true);
        });

        it('should say significant for untrusted html in remote', () => {
          remote.data['text/html'] = '<html><body><script>alert("wee");</script></body></html';
          let significant = OutputPanel.isTrustSignificant(model, rendermime);
          expect(significant).to.be(true);
        });

        it('should say insignificant for trusted html', () => {
          base.data['text/html'] = '<html><body><script>alert("wee");</script></body></html';
          model.trusted = true;
          let significant = OutputPanel.isTrustSignificant(model, rendermime);
          expect(significant).to.be(false);
        });

      });

    });

  });

});
