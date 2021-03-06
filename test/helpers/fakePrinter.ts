import { PrintStatus, Printer } from '../../src/utils/printer'

export default function fakePrinter({
  canPrint: isReady = async () => false,
  getStatus = async () => PrintStatus.Unknown,
  print = async function(this: Printer) {
    return { id: '__mock', owner: this }
  },
  ...rest
}: Partial<Printer> = {}): jest.Mocked<Printer> {
  return {
    canPrint: jest.fn(isReady),
    getStatus: jest.fn(getStatus),
    print: jest.fn(print),
    ...rest,
  }
}
