import { Telnet } from 'telnet-client';

const power = process.argv[2] === 'on' ? 'on' : 'off';

const connection = new Telnet();

// these parameters are just examples and most probably won't work for your use-case.
const params = {
  host: '192.168.1.4',
  port: 55443,
  negotiationMandatory: false,
  ors: '\r\n',
} as const;

try {
  console.log('establishing connection');
  await connection.connect(params);

  console.log('sending command');
  try {
    const res = await connection.send(
      JSON.stringify({
        id: 0,
        method: 'set_power',
        params: [power, 'smooth', 500, 0],
      }),
    );
    console.log('result:', res);
  } catch (error) {
    console.log('failed to send command:', error);
  }
} catch (error) {
  console.log('failed to connect:', error);
}

try {
  connection.end();
} catch (error) {
  console.log('failed to close connection:', error);
}
