import { faker } from '@faker-js/faker/locale/en';

export function mockUsers(length: number) {
  const createRowData = rowIndex => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const gender = faker.name.sex() as 'female' | 'male';
    const name = faker.name.fullName({firstName, lastName, sex: gender });
    const avatar = faker.image.avatar();

    // const city = faker.address.city();
    // const street = faker.address.street();
    const email = faker.internet.email();
    // const postcode = faker.address.zipCode();
    // const phone = faker.phone.number();
    // const amount = faker.finance.amount(1000, 90000);

    // const age = Math.floor(Math.random() * 30) + 18;
    // const stars = Math.floor(Math.random() * 10000);
    // const followers = Math.floor(Math.random() * 10000);
    // const rating = 2 + Math.floor(Math.random() * 3);
    // const progress = Math.floor(Math.random() * 100);

    const groupArr = ['8191-22', '8191-21', '8191-31', '8191-11'];
    const noteArr = ["average", "good", "exelent"];
    const group = groupArr[Math.floor(Math.random() * 4)];
    const note = noteArr[Math.floor(Math.random() * 3)];
    const year = (Math.floor(Math.random() * 5) + 1).toString();
    const telephone = faker.phone.number('+7 903 ### ####');
    const linkVK = "http://vk.com/" + firstName;

    const eventArr = ["Заявление", "Результать", "Договор"];
    const event = eventArr[Math.floor(Math.random() * 3)];
    const titleArr = ["Заявление 1", "Заявление 2", "Заявление 3", "Result for student 3 courses", "Result for student 4 courses", "Result for student 2 courses",
    "Договор 1", "Договор 2", "Договор 3", ];
    const title = titleArr[Math.floor(Math.random() * 9)];
    return {
      id: rowIndex + 1,
      avatar,
      name,
      group,
      year,
      note,
      title,
      telephone,
      linkVK,
      event,
      firstName,
      lastName,
      email,
    };
  };

  return Array.from({ length }).map((_, index) => {
    return createRowData(index);
  });
}

export function mockTreeData(options: {
  limits: number[];
  labels: string | string[] | ((layer: number, value: string, faker) => string);
  getRowData?: (layer: number, value: string) => any[];
}) {
  const { limits, labels, getRowData } = options;
  const depth = limits.length;

  const data = [];
  const mock = (list, parentValue?: string, layer = 0) => {
    const length = limits[layer];

    Array.from({ length }).forEach((_, index) => {
      const value = parentValue ? parentValue + '-' + (index + 1) : index + 1 + '';
      const children = [];
      const label = Array.isArray(labels) ? labels[layer] : labels;

      let row: any = {
        label: typeof label === 'function' ? label(layer, value, faker) : label + ' ' + value,
        value
      };

      if (getRowData) {
        row = {
          ...row,
          ...getRowData(layer, value)
        };
      }

      list.push(row);

      if (layer < depth - 1) {
        row.children = children;
        mock(children, value, layer + 1);
      }
    });
  };

  mock(data);

  return data;
}
