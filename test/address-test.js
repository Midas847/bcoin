/* eslint-env mocha */
/* eslint prefer-arrow-callback: "off" */

'use strict';

const Address = require('../lib/primitives/address');
const Script = require('../lib/script/script');
const assert = require('./util/assert');
const common = require('../test/util/common');

const p2sh1 = common.readTX('p2sh1');

describe('Address', function() {
  it('should match mainnet p2pkh address', () => {
    const raw = 'e34cce70c86373273efcc54ce7d2a491bb4a0e84';
    const p2pkh = Buffer.from(raw, 'hex');
    const addr = Address.fromPubkeyhash(p2pkh);
    const expectedAddr = '1MirQ9bwyQcGVJPwKUgapu5ouK2E2Ey4gX';
    assert.strictEqual(addr.toString(), expectedAddr);
  });

  it('should match mainnet p2pkh address 2', () => {
    const raw = '0ef030107fd26e0b6bf40512bca2ceb1dd80adaa';
    const p2pkh = Buffer.from(raw, 'hex');
    const addr = Address.fromPubkeyhash(p2pkh);
    const expectedAddr = '12MzCDwodF9G1e7jfwLXfR164RNtx4BRVG';
    assert.strictEqual(addr.toString(), expectedAddr);
  });

  it('should match testnet p2pkh address', () => {
    const raw = '78b316a08647d5b77283e512d3603f1f1c8de68f';
    const p2pkh = Buffer.from(raw, 'hex');
    const addr = Address.fromPubkeyhash(p2pkh, 'testnet');
    const expectedAddr = 'mrX9vMRYLfVy1BnZbc5gZjuyaqH3ZW2ZHz';
    assert.strictEqual(addr.toString(), expectedAddr);
  });

  it('should handle wrong p2pkh hash length', () => {
    const raw = '000ef030107fd26e0b6bf40512bca2ceb1dd80adaa';
    const p2pkh = Buffer.from(raw, 'hex');
    assert.throws(() => Address.fromPubkeyhash(p2pkh));
  });

  it('should handle empty p2pkh hash length', () => {
    const raw = '';
    const p2pkh = Buffer.from(raw, 'hex');
    assert.throws(() => Address.fromPubkeyhash(p2pkh));
  });

  it('should match mainnet p2sh address obtained from script', () => {
    const raw = p2sh1.getRaw();
    const script = Script.fromRaw(Buffer.from(raw, 'hex'));
    const p2sh = script.hash160();
    const addr = Address.fromScripthash(p2sh);
    const expectedAddr = '3QJmV3qfvL9SuYo34YihAf3sRCW3qSinyC';
    assert.strictEqual(addr.toString(), expectedAddr);
  });

  it('should match mainnet p2sh address obtained from script hash', () => {
    const raw = 'f815b036d9bbbce5e9f2a00abd1bf3dc91e95510';
    const p2sh = Buffer.from(raw, 'hex');
    const addr = Address.fromScripthash(p2sh);
    const expectedAddr = '3QJmV3qfvL9SuYo34YihAf3sRCW3qSinyC';
    assert.strictEqual(addr.toString(), expectedAddr);
  });

  it('should match mainnet p2sh address obtained from script 2', () => {
    const raw = 'e8c300c87986efa84c37c0519929019ef86eb5b4';
    const p2sh = Buffer.from(raw, 'hex');
    const addr = Address.fromScripthash(p2sh);
    const expectedAddr = '3NukJ6fYZJ5Kk8bPjycAnruZkE5Q7UW7i8';
    assert.strictEqual(addr.toString(), expectedAddr);
  });

  it('should match testnet p2sh address', () => {
    const raw = 'c579342c2c4c9220205e2cdc285617040c924a0a';
    const p2sh = Buffer.from(raw, 'hex');
    const addr = Address.fromScripthash(p2sh, 'testnet');
    const expectedAddr = '2NBFNJTktNa7GZusGbDbGKRZTxdK9VVez3n';
    assert.strictEqual(addr.toString(), expectedAddr);
  });

  it('should match mainnet segwit p2wpkh v0 address', () => {
    const raw = '751e76e8199196d454941c45d1b3a323f1433bd6';
    const p2wpkh = Buffer.from(raw, 'hex');
    const addr = Address.fromWitnessPubkeyhash(p2wpkh);
    const expectedAddr = 'bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4';
    assert.strictEqual(addr.toString(), expectedAddr);
  });

  it('should match mainnet segwit p2pwsh v0 address', () => {
    const p2wpkh = Buffer.from(''
                        + '1863143c14c51668'
                        + '04bd19203356da13'
                        + '6c985678cd4d27a1'
                        + 'b8c6329604903262', 'hex');
    const addr = Address.fromWitnessScripthash(p2wpkh);
    assert.strictEqual(addr.toString(),
        'bc1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3qccfmv3');
  });

  it('should match testnet segwit p2wpkh v0 address', () => {
    const raw = '751e76e8199196d454941c45d1b3a323f1433bd6';
    const p2wpkh = Buffer.from(raw, 'hex');
    const addr = Address.fromWitnessPubkeyhash(p2wpkh, 'testnet');
    const expectedAddr = 'tb1qw508d6qejxtdg4y5r3zarvary0c5xw7kxpjzsx';
    assert.strictEqual(addr.toString(), expectedAddr);
  });

  it('should match testnet segwit p2pwsh v0 address', () => {
    const p2wpkh = Buffer.from(''
                        + '1863143c14c51668'
                        + '04bd19203356da13'
                        + '6c985678cd4d27a1'
                        + 'b8c6329604903262', 'hex');
    const addr = Address.fromWitnessScripthash(p2wpkh, 'testnet');
    assert.strictEqual(addr.toString(),
        'tb1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3q0sl5k7');
  });

  it('should match testnet segwit p2pwsh v0 address 2', () => {
    const p2wpkh = Buffer.from(''
                        + '000000c4a5cad462'
                        + '21b2a187905e5266'
                        + '362b99d5e91c6ce2'
                        + '4d165dab93e86433', 'hex');
    const addr = Address.fromWitnessScripthash(p2wpkh, 'testnet');
    assert.strictEqual(addr.toString(),
        'tb1qqqqqp399et2xygdj5xreqhjjvcmzhxw4aywxecjdzew6hylgvsesrxh6hy');
  });

  it('should handle invalid segwit hrp', () => {
    const addr = 'tc1qw508d6qejxtdg4y5r3zarvary0c5xw7kg3g4ty';
    assert.throws(() => Address.fromString(addr));
  });

  it('should handle invalid segwit checksum', () => {
    const addr = 'bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t5';
    assert.throws(() => Address.fromString(addr));
  });

  it('should handle invalid segwit version', () => {
    const addr = 'BC13W508D6QEJXTDG4Y5R3ZARVARY0C5XW7KN40WF2';
    assert.throws(() => Address.fromString(addr));
  });

  it('should handle invalid segwit program length', () => {
    const addr = 'bc1rw5uspcuh';
    assert.throws(() => Address.fromString(addr));
  });

  it('should handle invalid segwit program length 2', () => {
    const addr = 'bc10w508d6qejxtdg4y5r3zarvary0c5xw7kw5'
               + '08d6qejxtdg4y5r3zarvary0c5xw7kw5rljs90';
    assert.throws(() => Address.fromString(addr));
  });

  it('should handle invalid segwit program length for witness v0', () => {
    const addr = 'tb1pw508d6qejxtdg4y5r3zarqfsj6c3';
    assert.throws(() => Address.fromString(addr));
  });

  it('should handle segwit mixed case', () => {
    const addr = 'tb1qrp33g0q5c5txsp9arysrx4k6z'
               + 'dkfs4nce4xj0gdcccefvpysxf3q0sL5k7';
    assert.throws(() => Address.fromString(addr));
  });

  it('should handle segwit zero padding of more than 4 bits', () => {
    const addr = 'tb1pw508d6qejxtdg4y5r3zarqfsj6c3';
    assert.throws(() => Address.fromString(addr));
  });

  it('should handle segwit non-zero padding in 8-to-5 conversion', () => {
    const addr = 'tb1qrp33g0q5c5txsp9arysrx4k6'
               + 'zdkfs4nce4xj0gdcccefvpysxf3pjxtptv';
    assert.throws(() => Address.fromString(addr));
  });
});
