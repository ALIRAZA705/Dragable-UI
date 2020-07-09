import React from 'react'
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
    DragDropContext,
    Droppable,
    Draggable
} from 'react-beautiful-dnd';
import uid from 'uuid/v4';
import faker from 'faker/locale/en_US';
import classNames from 'classnames';
import {
    Card,
    CardHeader,
    CardTitle,
    Media,
    Avatar,
    AvatarAddOn
} from './../../../app/components';
import { randomAvatar, randomArray } from './../../utilities';
import { reorder, move } from './../Interface/DragAndDropElements/components/utilities';
import classes from './../Interface/DragAndDropElements/components/common.scss';
const generateItem = () => ({
    id: uid(),
    type: 'single',
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    title: faker.name.jobType(),
    avatarUrl: randomAvatar(),
    status: randomArray(['success', 'warning', 'danger'])
});
const generateItem7 = () => ({
    id: uid(),
    avatarUrl: randomAvatar(),
    status: randomArray(['success', 'warning', 'danger'])
});
const generateItem1 = () => ({
    id:uid(),
    // type: 'single',
    // name: "ali",
    // title: "software",
    // avatarUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8PDQ8NDQ8PDQ8NDQ0ODQ0NDw8NDg0NFREWFhURFRUYHSggGB0mGxUVIjEhJSorLi4uFx82ODMsNygtLisBCgoKDg0OGhAQGi0lICYtLSstMC0tLS0tLS0tLSstLS0tLS0tKy0tKy0rLS0rLS0tLS0tLS0tLSstLS0tLS0tL//AABEIAL0BCwMBEQACEQEDEQH/xAAbAAEBAAIDAQAAAAAAAAAAAAAAAQMGAgUHBP/EAEYQAAICAAIGBQcICAQHAAAAAAABAgMEEQUGEiExQRNRYXGBByJScpGhsRQjMkKSs8HRJDNDYoKisvAlU3N0FRZEY4PC8f/EABsBAQACAwEBAAAAAAAAAAAAAAABBQIEBgMH/8QANhEBAAIBAgQDBQgBAwUAAAAAAAECAwQRBRIhMUFhsRMyUXHRIlKBkaHB4fAVFGLxBhYjM0L/2gAMAwEAAhEDEQA/APWyUAAAAAAAAACZgMwJmAzAmYDMBmAAZgAGYDMC5gMwLmAAoAAAAAAAAAAAAAAAAAAAQCZgQAAAgAABAAFAAAKAAuYFAAUAAAAAAAAAAAAAAABAAEAgACAQABdkDlsANgJNgITZCUyCEAoDMCgUABQKAAAAAAAAAAAAAABGBAIBAGYDIDkoBLIoAc1ADkqwL0YQjrCXF1gcXADHKAHBxCEAoFAAVAUCgAAAAAAAAAAABAIwIBAABIDLGASyxgB8GkdN4bDbrJqU+VcPOk/BHti0+TJ7sNTUa3Dgj7dvq13Ga52vdh6YwXKVrzf2V+Zv4+G/fn8lLm4/4Yq/n9P5dXdp/Gz437PZCMUvfmbNdDijwV1+M6q3advlD5/+I4p/9Tb9o9P9Ji+68P8AK6r78slemMbH6OJn3SUZfFGM6LFPgyrxjVR/9ej78Nrhi4frIV3Lxrl7Vmvca9+HUn3Z2b2Lj+SPfiJ/R32j9bsLa1GzPDzf+Zug363D25Glk0WSnmudPxfT5ekztPn9Xe5JrNNNPg1v3Gos4ndjlAJYpRCHACgUAByAoAAAAAAAAAAAAQCAcQACKAzQiEuV90KoOyySjFLe3uJrWbTtDC+StKza07Q0rTetNludeHbqr4bS3Tl+X98C40+grXrk6z8HM63jF7/Zw9I+Pj+Hw9Wu9vN723vbZYxG3SFFaZmd5ZsNh7LJbNUJ2S6oRcmu/LgY2vWkb2nZOPFfJO1ImZ8nb1asYp75qun/AFbIp+xZs1ba/DXx3+Swx8F1d+8RHzn6bsy1XnzxGHXd0j/9Tz/yWP4T+j3/AO3s/jev6/Rxlqxd9S3Dz6krHFv7SRlHEcU94l5X4BqY7TWfxn6PhxmicRSs7apxj6aW3D7Uc0bOPUYsnu2VufQajB1yUmI+PePzh8Eq0+J7bNSLTD69GaVxGDfzUtuvPfTNtwa7PRfd7zUz6SmT5rTRcUy4J233j4T/AHo3vQumqcZDOvzbI/Tql9KP5rtKXNgtinaXYaTW49TXek9fGPF904Hi3GCcQhwAoFQFQFQFAAAAAAAAAAIwIBAIASAywiEuWIvhTXK2x7MYrNmVazadoYZMlcdZtaekPOdOaanirM23GuL8yH4vtL7TaauKPNyGu1ttTb4V8I/eXXVVynJQgnKUnlGMVm2+pI2ZtERvLQrSbTFaxvMtu0VqpGKU8Y9qXHoIPKK9eS49y9pVZ+IT2xfn9F/o+CR72f8AKP3n6NgilCOxWo1wXCFaUI+4rbWtad7TuvqY6445aRtHkwyiYs2KUQMMogSu2cPoSce57n3rmB8+KwuHv/Ww6Gx8L6Vkm+ucOD71vNvDrcmPp3jz+qq1nCNPqOsRy2+MfvHj6+boNJaMsw7W2lKEv1dsN9di7H19hdYNRTNG9fychrNBm0ltrx08J8JfBFzrnG2mThODzUl8O1dhlkx1vG0vPT6m+G8WrO0vQNXNORxleTyhfWl0sOT/AHo9j93xoNRp5xW8nc6DXV1NN/GO8f3wdlOJrrBgkghAAFAoHIAAAAAAAAAYHEABxAgGSCAzwiEtA1v0y77XTB/NVPJ/vTX5f3wLrRafkrzz3n0cxxTV+1v7OvaO/nP8eroaYSnKMIJynNqMYrjKT5G7a0VjeVVWlr2itY3mXo2r+g44SG08p3zXzlnKC9CHUu3mUWq1U5p2jt/e7q9BoK6au89bT3n9o8vV2UkaixY5RJGKUQh0Wl9ZcJhbVTdNqbSbUYuSgnwcmuA2N3ZJqUVKLTjJJxa4NPgwMcogYpxAQsSjKuyKsqn9Ot8H2rqfaZUvaluas9Xnmw0zUmmSN4l0Gl9GuiSlFudNmbqs59sJdUkdBptTGavn4uE4lw6+kybd6z2n9p8/V11GInh7YYil5Sg+HKUecX2MzzYoyVmJeWj1VsGSLV/5emYDGQxFEL6/ozjnlzi+cX2p5o53JSaWmsu/wZq5scXr2lynEwezCwgAqAoFQFAAAAAAAAgEYEAgBAZq0Eut1q0l8nwsnF5Ts8yHjz/vqNnS4vaZIie3i0tfn9jimY79oeZORfuS2bxqFofZh8tsXn2JxoT+rXwc+9/DvKjX5959nHbxdBwnSRWvtrd57fL+fT5ttaK1dODQHSaxaxYbAxzultWSWddFeTsmuvL6q7X4ZkxCJnZ0Oqmt9uPxU6ZYeNdarlZGUJSk68mllNvc88+SRMwiJ3aZr8stKYj/AMX3cSY7Inu3i/H2YXQ1OIqgrJQw+G3PNxipKKc5ZclmR4svB1mhNearWq8VFUTeSVkXnU32574+9do2Ru2trNZrenvTXBohLFOICuEZxlh7f1dvP/Ks+rYvx7D0w5bYrxarX1WmpqcU47+P6T8Wp4vDyrnOqxZShJxku1c12HS0vF6xaO0vnebFbDkmlu8Ts7jUbSHR3zwkn5l2c68+ViW9eK/pKziGHpzw6TgWr6zhnx6x8/76N2siVLqXzTQQgACoDkgKAAAAAAABAIwIBALBAfRWgloOv2N28Uqk/Npj/M//AJ7y44fTak2+LneK5ObJFPhHq13R2FeIxNOHX7WxRbXKHGT8Ips2s2TkpNvg0MGH2mStPi9mqqUIxhFKMYxUYxXBRSySOdmZmd5dhWIrG0DRCXQa46wR0fhnZkpXWNww9b4SnlvlL92PF96XMmI3RM7PPNVtWbtKXTxmMnN1Obc7G/nMRPnGL5JcM+XBdmUzsxiN3qGCwFWHrVVFcaoL6sFlm+tvm+1mDN5F5Q1lpXEerT91Ezjswnu9O0FH9Cwv+1w/3cTFk1/WjUyrERlbhYxpxG97Mco1Xvqa4Rl2rd19amJRMOh1L0/Om35Dis1FycK9vdKm1PLo3nyz3djJmERLfZRMWTFOIHXaz07UKcSuL+YtfXOKzg+9x+Bb8Ny7xNJ8OsOV/wCodNEWrmjx6T8/D9PRrjudc4XQ+lVOM1yzyeeRYZaResxKi0mWcWSLR4S9WhYpwjOO9TipJ9aazOZmNp2fRq2i0RMMNiIZMQQqAoHJAUAAAAAAACMCAQCMDlAJfTX19W8Il5DpzEbeKvm+dsl9l7P4HQ4K8uKseTlNVbnzWnz9OjuPJrh9vHWWPhTS8uyU5ZfBSNTX32pEfGW7wvHvlm3wj1entFQv3FoDxrW26ektN/JYPzYWrCV5cIqL+dn7dvwijOOkMJ6y9YweDhRVCmpbMKoKEEupIwZsjQHjHlHX+K3+ph/uYmcdmEvUdCR/QsL/ALTDfdRMWT6ZRCXnHlM0UoWV42Cy6Z9Fdlu+dis4S73FNfwGUMJbVq3j/lOCpue+WzsWevHc/wA/ExllD7pRAw42rbwmJh6MI3R7HCW/3Nm1o78uavn0VvFsXtNJfy6/l/DTLVnFnQS4SvSXoWqV3SaPofOEZV/Yk4r3I53VV5ctn0Dht+fTUny2/Lo7Cw128wBCgVAVAVAUAAAAADAgEA4gGBzrCWeT8yXqS+AhE9niuNnnZY+uyb/mZ0lfdj5OTv70/OW5+SaO/GS554dexWP8Sr4hPu/iteFR78/L93obK5cIB4v5M10ul+knvl0eJt/jlxf8zM57MI7vYmjBm4NAeL+Upf4tf/p4f7mBnHZhPd6poWP6FhP9phfuYmLKH0yiEtY8odSei7m+MJ0Sj39JFfCTJjuxl1nkym3hLovhDEPLxgmJIbZKJCXDZzhevSw2IX8jPTDO2Ss+cerX1cb6fJH+2fRonLwOnfOm7ahy/QWuq6xe/P8AEoNd/wC2Xc8GnfSx85d3Yaa1YWEAFQFA5AAAAAAAARgQDiBGBkrAzv6Ml1xkvcIJ7PFNIrZutj6Nti9kmdFSd6RPlDlckbXn5z6tu8klvzuLr640SXh0ifxRXa+OlZ+az4XPW0fL93pbK1cOIHimqUvkOnuhn5qV+Iwrz3bm2ovxyj7TOezCO72dowZuDQHTaX1ZwWLtjdiaFZOCUVLanDainmoyUWtpceJO6NnZbOSySSS3JLckuohLhJAab5TsWq8AqvrYi6EUuezDz2/aorxMoY2cPJthXHAOb/bXTkvVSUc/cxJHZtEokJYcS9mjEz9HC3Zd7jkvez208b5ax5w1ddbl02Sf9s+jQc9x0r59s3nUWGWAT9O21/zNfgc/rZ/80u44RG2lr+Pq7mw1FowBCoCoCgUCgAAAAAAjAgEAgHKDA+iDCZeRa24bosbdHlKSmu5r80y801ubFDnNXTlzT+bJ5Psf0Gk603lG+M6X6zylH3xy8Ty1lObH8npob8uaPPo9nKdfoB5P5V9CSqxMNI1JqF2xG2Uf2eIivNl4pLxj2mVZYy3PUvWOGPwybaWIqSjiIc8/TS6mRMbJiWwNEJcGgODQGG+yMIynOSjGCcpSk8lGK4tsDxzWHSFmltIwroTcM+iw6a+rn51j6s+PckZx0YT1eq4DBRooroh9GqEYLty4v2mLNklEIdTrRf0eClH62IshWuvZj58n7kvE3dBTmy7/AAVPGsvJpuX707fu0qyWUW+pF64yI6vTNX8N0WCore5quLkv3nvfvbOaz25skz5voOjx+zwUr5PosZ5NlhCFQFAoHIAAAAAAACMCARgQBEDPF7glo3lIwH6vExXD5ufc+D9v9RZaDJ3p+Kp4ji7X/BoDnKEo2QezKEozhLqlF5p+1G9aN42lWRMxO8PdtW9LQxmEqxEPrx8+PoTW6UfB5+4ostJpaay6TDljJSLQ7M83q+fSGCrxFM6L4qddsXGcXzXWuprinyaA8a05q/jdDYlYnDym6VL5rEwWeUX+ztXLq6n7lnvuw22bRoPynUTio46uVM+DtqTnVLt2eMfeRyp5mxw1u0bJZrGUL1pOL9jI2lO7rtJa/wCjqU9i14iXKNMW0/4nkhtJvDQdNax43S1iw1Nco1yl5uGqzbl+9ZLn7kjLbZjvu3rUzVKOBh0luU8TZHKclvjXH0I/i+ZjMsojZskkQlj2M3kuZI0TWrSKuxXRwedeGTqi+UrM/Pl7Vl/CXmhxcmPee89fo4/i+p9rm5Y7V6fj4vk0Xg3iMRVRlmpTTn/px3y9vDxPfU5PZ45lqcP0/ts9a+Hefk9Rnu3dW45x3UPmmwljQQqAoHJAUAAAAAAACAQCMCMCAZoMJfJpfBRvpnTPhOLXc+TM8d5paJh5ZscXrNZeN6QwkqrJ1WLKUJOL7eprsa3l7FovWLQ529Jpaay7rULWX5DiHVc8sNe1tt8KrOCn3cn4Pkamqwc8bx3htaPUeyttPaXtEJqSTW9Pg0VK9UDhOCacZJSTTTTWaa6mgNQ0v5OdH3tyrjPCSe/9HaVefqNNLwyJ3lGzX7fJO8/Mxyy6pYbNrxVhPMjlfZgvJZh4tO/EW3ZcYwjGmL+L945jlbdovQ2GwkNjDUwqT4tLOUvWk97Md2T62gODQGva26cWFq6Kt/pN0co5caa3udj7eKXt5G5pNP7S289oVnEdZ7GnLX3p/Tz+jQqI5IvYcfdvWpGjNiuWKmvOtWzVnxVXX48fYU+vzc9+SO0erqODaT2eP2lu9vT+Wx2Mr12wSYQgFAqAqAoAAAAAAABgcQAEAgFgwOct6CWoa6aB6eHT1L52tedFcbIdXf1G7pNRyTy27K7Wabnjmr3ebWwLSYU7cNSNdnhNnC4tuWH4V273Khei+uPvXdw0NRpub7Ve6w0ms5PsX7en8PWMNiIWwjOuUZxklKMotSTT5priVsxMTtK4i0TG8MrIS4sCZAcWgOLQHBoDW9Z9aasGnVXldiWt1fGNT9KzL+ni+zibWn005J3npDQ1murhjavW397vOZWTtslbbJ2WWPanOXFv8O4u6UisbQ5XLkte02tO8y2DVrQrxVicllTBrpH6X7q/E8dXqPZV2jvLZ4doZ1GTmt7sfr5fV6NkopRjuSWSXUihl18RswTkBiAqAqAoFAoAAAAAAAACMCAQCAQDJGQS4WwCJjdpWtWq3SOWIwy8977KuCm+tdT+PxsNNqtvs37KzVaTf7VO7QbqWm00008mmsmn1NFh3Vcxs+/QesGLwMs8PZ5jecqbM5VS7cuT7VkeGXBW/d64dRfF7s/g9C0P5S8LYlHFQnhp7s5ZOyrP1orNeKNC+jvHu9Vnj4hjt73RteC01hb1nTfVZ6lkZP2JmvbHaveG5XLS3aX27S6zBnuw34muCznOMEuc5KK95MRM9kTaI7y6DSWu2j6M/nldJfUw66Vt9W0vNXiz3ppslvBrZNdhp47/AC6tM01r3icRnDDr5LW920ntXyXrcI+G/tN7Fo61626qrUcSvfpTpH6tcpq5ve3vbe9t9Zv1qqLW3bJq7oCzFSTycKk/OsfPsj+Z46jVVwxtHWf73bOj0F9TO89K/H4/J6PhcNCmuNVSUYxWXeUd7zeeaXVYsVcdYrWNognIxZsLYACgUCgUAAAAAAAAAAAQDiAAgADmmBjsrBPV0GnNXKcT5zXR2crI5Zvv60bOHU2x9PBqZ9JXJ18Wi6U1axNDbcHZD/MrTksu1cV8O0sseox38dpVWXS5MfhvHk6Z1Hts1nB0LqI2Q5xUluUppdSlJIjkg5p+J0Ge97+/eTFWEyzQpMoqwmXY4DR1t0tmmuU31xXmrvfBC16Uje07FMV8s7Ujdu2g9S0srMW0+aqj9HxfP++JX5tfM9MfTzW2m4VEfay9fLw/luEIxhFRglGK3JLcV0zM9ZXVaxEbQxykQlikwhxAoFAqAoFAAAAAAAAAAAEAjAgACAQDmpASUUwlilSN0TES63G6Cw12+2mLfpJbMvtLee1NRenaWvk0uO/eHUX6kYd/QnZX2ZqS96NiuuvHfZq24dSe0zD5/wDkSPK+XjFGf+vn4PP/ABkfelnp1Eqz866x+qor8CJ19vCITHC6+Np/R22C1Swde919I/8AuNyXse73HjbWZbeP5PenD8NfDf59Xe0UwgsoRUUuCSyNabTPduxWI6QyOZDJilMDG2EIBQKgKBQKAAAAAAAAAAAABgQCAQCAAIBUwOSkBdwSZICqKAqyAbQEcwODkEOIFAAUCoCgUAAAAAAAAAAAAAAABAJkBAGQEyAATIABcwG0AzAmYAABQKAAuQFAAUAAAAAAAAAAAAAAAAAgEAAQABAAAAAAAAKAAAXIC5AAKAAAAAAAAAAAAAAAAAAAEAATIAwIAAAAAAC5AQC5AAKBQAAAAAAAAAAB/9k=",
    status: randomArray(['success', 'warning', 'danger'])
}
);
const generateItem2 = () => ({
    id:uid(),
    // type: 'single',
    // name: "raza",
    // title: "software",

    // avatarUrl: "data:image/jpeg;base64,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",
    status: randomArray(['success', 'warning', 'danger'])
});
const generateItem3 = () => ({
    id:uid(),
    // type: 'single',
    // name: "Muhammad",
    // title: "software",
    // avatarUrl: "data:image/jpeg;base64,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",
    // avatarUrl:<i className="fa fa-fw fa-bar-chart" ></i>,
    status: randomArray(['success', 'warning', 'danger'])
});

const generateItem4 = () => ({
    id:uid(),
    // type: 'single',
    // name: "Mobeen",
    // title: "software",
    // avatarUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8PDQ8NDQ8PDQ8NDQ0ODQ0NDw8NDg0NFREWFhURFRUYHSggGB0mGxUVIjEhJSorLi4uFx82ODMsNygtLisBCgoKDg0OGhAQGi0lICYtLSstMC0tLS0tLS0tLSstLS0tLS0tKy0tKy0rLS0rLS0tLS0tLS0tLSstLS0tLS0tL//AABEIAL0BCwMBEQACEQEDEQH/xAAbAAEBAAIDAQAAAAAAAAAAAAAAAQMGAgUHBP/EAEYQAAICAAIGBQcICAQHAAAAAAABAgMEEQUGEiExQRNRYXGBByJScpGhsRQjMkKSs8HRJDNDYoKisvAlU3N0FRZEY4PC8f/EABsBAQACAwEBAAAAAAAAAAAAAAABBQIEBgMH/8QANhEBAAIBAgQDBQgBAwUAAAAAAAECAwQRBRIhMUFhsRMyUXHRIlKBkaHB4fAVFGLxBhYjM0L/2gAMAwEAAhEDEQA/APWyUAAAAAAAAACZgMwJmAzAmYDMBmAAZgAGYDMC5gMwLmAAoAAAAAAAAAAAAAAAAAAAQCZgQAAAgAABAAFAAAKAAuYFAAUAAAAAAAAAAAAAAABAAEAgACAQABdkDlsANgJNgITZCUyCEAoDMCgUABQKAAAAAAAAAAAAAABGBAIBAGYDIDkoBLIoAc1ADkqwL0YQjrCXF1gcXADHKAHBxCEAoFAAVAUCgAAAAAAAAAAABAIwIBAABIDLGASyxgB8GkdN4bDbrJqU+VcPOk/BHti0+TJ7sNTUa3Dgj7dvq13Ga52vdh6YwXKVrzf2V+Zv4+G/fn8lLm4/4Yq/n9P5dXdp/Gz437PZCMUvfmbNdDijwV1+M6q3advlD5/+I4p/9Tb9o9P9Ji+68P8AK6r78slemMbH6OJn3SUZfFGM6LFPgyrxjVR/9ej78Nrhi4frIV3Lxrl7Vmvca9+HUn3Z2b2Lj+SPfiJ/R32j9bsLa1GzPDzf+Zug363D25Glk0WSnmudPxfT5ekztPn9Xe5JrNNNPg1v3Gos4ndjlAJYpRCHACgUAByAoAAAAAAAAAAAAQCAcQACKAzQiEuV90KoOyySjFLe3uJrWbTtDC+StKza07Q0rTetNludeHbqr4bS3Tl+X98C40+grXrk6z8HM63jF7/Zw9I+Pj+Hw9Wu9vN723vbZYxG3SFFaZmd5ZsNh7LJbNUJ2S6oRcmu/LgY2vWkb2nZOPFfJO1ImZ8nb1asYp75qun/AFbIp+xZs1ba/DXx3+Swx8F1d+8RHzn6bsy1XnzxGHXd0j/9Tz/yWP4T+j3/AO3s/jev6/Rxlqxd9S3Dz6krHFv7SRlHEcU94l5X4BqY7TWfxn6PhxmicRSs7apxj6aW3D7Uc0bOPUYsnu2VufQajB1yUmI+PePzh8Eq0+J7bNSLTD69GaVxGDfzUtuvPfTNtwa7PRfd7zUz6SmT5rTRcUy4J233j4T/AHo3vQumqcZDOvzbI/Tql9KP5rtKXNgtinaXYaTW49TXek9fGPF904Hi3GCcQhwAoFQFQFQFAAAAAAAAAAIwIBAIASAywiEuWIvhTXK2x7MYrNmVazadoYZMlcdZtaekPOdOaanirM23GuL8yH4vtL7TaauKPNyGu1ttTb4V8I/eXXVVynJQgnKUnlGMVm2+pI2ZtERvLQrSbTFaxvMtu0VqpGKU8Y9qXHoIPKK9eS49y9pVZ+IT2xfn9F/o+CR72f8AKP3n6NgilCOxWo1wXCFaUI+4rbWtad7TuvqY6445aRtHkwyiYs2KUQMMogSu2cPoSce57n3rmB8+KwuHv/Ww6Gx8L6Vkm+ucOD71vNvDrcmPp3jz+qq1nCNPqOsRy2+MfvHj6+boNJaMsw7W2lKEv1dsN9di7H19hdYNRTNG9fychrNBm0ltrx08J8JfBFzrnG2mThODzUl8O1dhlkx1vG0vPT6m+G8WrO0vQNXNORxleTyhfWl0sOT/AHo9j93xoNRp5xW8nc6DXV1NN/GO8f3wdlOJrrBgkghAAFAoHIAAAAAAAAAYHEABxAgGSCAzwiEtA1v0y77XTB/NVPJ/vTX5f3wLrRafkrzz3n0cxxTV+1v7OvaO/nP8eroaYSnKMIJynNqMYrjKT5G7a0VjeVVWlr2itY3mXo2r+g44SG08p3zXzlnKC9CHUu3mUWq1U5p2jt/e7q9BoK6au89bT3n9o8vV2UkaixY5RJGKUQh0Wl9ZcJhbVTdNqbSbUYuSgnwcmuA2N3ZJqUVKLTjJJxa4NPgwMcogYpxAQsSjKuyKsqn9Ot8H2rqfaZUvaluas9Xnmw0zUmmSN4l0Gl9GuiSlFudNmbqs59sJdUkdBptTGavn4uE4lw6+kybd6z2n9p8/V11GInh7YYil5Sg+HKUecX2MzzYoyVmJeWj1VsGSLV/5emYDGQxFEL6/ozjnlzi+cX2p5o53JSaWmsu/wZq5scXr2lynEwezCwgAqAoFQFAAAAAAAAgEYEAgBAZq0Eut1q0l8nwsnF5Ts8yHjz/vqNnS4vaZIie3i0tfn9jimY79oeZORfuS2bxqFofZh8tsXn2JxoT+rXwc+9/DvKjX5959nHbxdBwnSRWvtrd57fL+fT5ttaK1dODQHSaxaxYbAxzultWSWddFeTsmuvL6q7X4ZkxCJnZ0Oqmt9uPxU6ZYeNdarlZGUJSk68mllNvc88+SRMwiJ3aZr8stKYj/AMX3cSY7Inu3i/H2YXQ1OIqgrJQw+G3PNxipKKc5ZclmR4svB1mhNearWq8VFUTeSVkXnU32574+9do2Ru2trNZrenvTXBohLFOICuEZxlh7f1dvP/Ks+rYvx7D0w5bYrxarX1WmpqcU47+P6T8Wp4vDyrnOqxZShJxku1c12HS0vF6xaO0vnebFbDkmlu8Ts7jUbSHR3zwkn5l2c68+ViW9eK/pKziGHpzw6TgWr6zhnx6x8/76N2siVLqXzTQQgACoDkgKAAAAAAABAIwIBALBAfRWgloOv2N28Uqk/Npj/M//AJ7y44fTak2+LneK5ObJFPhHq13R2FeIxNOHX7WxRbXKHGT8Ips2s2TkpNvg0MGH2mStPi9mqqUIxhFKMYxUYxXBRSySOdmZmd5dhWIrG0DRCXQa46wR0fhnZkpXWNww9b4SnlvlL92PF96XMmI3RM7PPNVtWbtKXTxmMnN1Obc7G/nMRPnGL5JcM+XBdmUzsxiN3qGCwFWHrVVFcaoL6sFlm+tvm+1mDN5F5Q1lpXEerT91Ezjswnu9O0FH9Cwv+1w/3cTFk1/WjUyrERlbhYxpxG97Mco1Xvqa4Rl2rd19amJRMOh1L0/Om35Dis1FycK9vdKm1PLo3nyz3djJmERLfZRMWTFOIHXaz07UKcSuL+YtfXOKzg+9x+Bb8Ny7xNJ8OsOV/wCodNEWrmjx6T8/D9PRrjudc4XQ+lVOM1yzyeeRYZaResxKi0mWcWSLR4S9WhYpwjOO9TipJ9aazOZmNp2fRq2i0RMMNiIZMQQqAoHJAUAAAAAAACMCAQCMDlAJfTX19W8Il5DpzEbeKvm+dsl9l7P4HQ4K8uKseTlNVbnzWnz9OjuPJrh9vHWWPhTS8uyU5ZfBSNTX32pEfGW7wvHvlm3wj1entFQv3FoDxrW26ektN/JYPzYWrCV5cIqL+dn7dvwijOOkMJ6y9YweDhRVCmpbMKoKEEupIwZsjQHjHlHX+K3+ph/uYmcdmEvUdCR/QsL/ALTDfdRMWT6ZRCXnHlM0UoWV42Cy6Z9Fdlu+dis4S73FNfwGUMJbVq3j/lOCpue+WzsWevHc/wA/ExllD7pRAw42rbwmJh6MI3R7HCW/3Nm1o78uavn0VvFsXtNJfy6/l/DTLVnFnQS4SvSXoWqV3SaPofOEZV/Yk4r3I53VV5ctn0Dht+fTUny2/Lo7Cw128wBCgVAVAVAUAAAAADAgEA4gGBzrCWeT8yXqS+AhE9niuNnnZY+uyb/mZ0lfdj5OTv70/OW5+SaO/GS554dexWP8Sr4hPu/iteFR78/L93obK5cIB4v5M10ul+knvl0eJt/jlxf8zM57MI7vYmjBm4NAeL+Upf4tf/p4f7mBnHZhPd6poWP6FhP9phfuYmLKH0yiEtY8odSei7m+MJ0Sj39JFfCTJjuxl1nkym3hLovhDEPLxgmJIbZKJCXDZzhevSw2IX8jPTDO2Ss+cerX1cb6fJH+2fRonLwOnfOm7ahy/QWuq6xe/P8AEoNd/wC2Xc8GnfSx85d3Yaa1YWEAFQFA5AAAAAAAARgQDiBGBkrAzv6Ml1xkvcIJ7PFNIrZutj6Nti9kmdFSd6RPlDlckbXn5z6tu8klvzuLr640SXh0ifxRXa+OlZ+az4XPW0fL93pbK1cOIHimqUvkOnuhn5qV+Iwrz3bm2ovxyj7TOezCO72dowZuDQHTaX1ZwWLtjdiaFZOCUVLanDainmoyUWtpceJO6NnZbOSySSS3JLckuohLhJAab5TsWq8AqvrYi6EUuezDz2/aorxMoY2cPJthXHAOb/bXTkvVSUc/cxJHZtEokJYcS9mjEz9HC3Zd7jkvez208b5ax5w1ddbl02Sf9s+jQc9x0r59s3nUWGWAT9O21/zNfgc/rZ/80u44RG2lr+Pq7mw1FowBCoCoCgUCgAAAAAAjAgEAgHKDA+iDCZeRa24bosbdHlKSmu5r80y801ubFDnNXTlzT+bJ5Psf0Gk603lG+M6X6zylH3xy8Ty1lObH8npob8uaPPo9nKdfoB5P5V9CSqxMNI1JqF2xG2Uf2eIivNl4pLxj2mVZYy3PUvWOGPwybaWIqSjiIc8/TS6mRMbJiWwNEJcGgODQGG+yMIynOSjGCcpSk8lGK4tsDxzWHSFmltIwroTcM+iw6a+rn51j6s+PckZx0YT1eq4DBRooroh9GqEYLty4v2mLNklEIdTrRf0eClH62IshWuvZj58n7kvE3dBTmy7/AAVPGsvJpuX707fu0qyWUW+pF64yI6vTNX8N0WCore5quLkv3nvfvbOaz25skz5voOjx+zwUr5PosZ5NlhCFQFAoHIAAAAAAACMCARgQBEDPF7glo3lIwH6vExXD5ufc+D9v9RZaDJ3p+Kp4ji7X/BoDnKEo2QezKEozhLqlF5p+1G9aN42lWRMxO8PdtW9LQxmEqxEPrx8+PoTW6UfB5+4ostJpaay6TDljJSLQ7M83q+fSGCrxFM6L4qddsXGcXzXWuprinyaA8a05q/jdDYlYnDym6VL5rEwWeUX+ztXLq6n7lnvuw22bRoPynUTio46uVM+DtqTnVLt2eMfeRyp5mxw1u0bJZrGUL1pOL9jI2lO7rtJa/wCjqU9i14iXKNMW0/4nkhtJvDQdNax43S1iw1Nco1yl5uGqzbl+9ZLn7kjLbZjvu3rUzVKOBh0luU8TZHKclvjXH0I/i+ZjMsojZskkQlj2M3kuZI0TWrSKuxXRwedeGTqi+UrM/Pl7Vl/CXmhxcmPee89fo4/i+p9rm5Y7V6fj4vk0Xg3iMRVRlmpTTn/px3y9vDxPfU5PZ45lqcP0/ts9a+Hefk9Rnu3dW45x3UPmmwljQQqAoHJAUAAAAAAACAQCMCMCAZoMJfJpfBRvpnTPhOLXc+TM8d5paJh5ZscXrNZeN6QwkqrJ1WLKUJOL7eprsa3l7FovWLQ529Jpaay7rULWX5DiHVc8sNe1tt8KrOCn3cn4Pkamqwc8bx3htaPUeyttPaXtEJqSTW9Pg0VK9UDhOCacZJSTTTTWaa6mgNQ0v5OdH3tyrjPCSe/9HaVefqNNLwyJ3lGzX7fJO8/Mxyy6pYbNrxVhPMjlfZgvJZh4tO/EW3ZcYwjGmL+L945jlbdovQ2GwkNjDUwqT4tLOUvWk97Md2T62gODQGva26cWFq6Kt/pN0co5caa3udj7eKXt5G5pNP7S289oVnEdZ7GnLX3p/Tz+jQqI5IvYcfdvWpGjNiuWKmvOtWzVnxVXX48fYU+vzc9+SO0erqODaT2eP2lu9vT+Wx2Mr12wSYQgFAqAqAoAAAAAAABgcQAEAgFgwOct6CWoa6aB6eHT1L52tedFcbIdXf1G7pNRyTy27K7Wabnjmr3ebWwLSYU7cNSNdnhNnC4tuWH4V273Khei+uPvXdw0NRpub7Ve6w0ms5PsX7en8PWMNiIWwjOuUZxklKMotSTT5priVsxMTtK4i0TG8MrIS4sCZAcWgOLQHBoDW9Z9aasGnVXldiWt1fGNT9KzL+ni+zibWn005J3npDQ1murhjavW397vOZWTtslbbJ2WWPanOXFv8O4u6UisbQ5XLkte02tO8y2DVrQrxVicllTBrpH6X7q/E8dXqPZV2jvLZ4doZ1GTmt7sfr5fV6NkopRjuSWSXUihl18RswTkBiAqAqAoFAoAAAAAAAACMCAQCAQDJGQS4WwCJjdpWtWq3SOWIwy8977KuCm+tdT+PxsNNqtvs37KzVaTf7VO7QbqWm00008mmsmn1NFh3Vcxs+/QesGLwMs8PZ5jecqbM5VS7cuT7VkeGXBW/d64dRfF7s/g9C0P5S8LYlHFQnhp7s5ZOyrP1orNeKNC+jvHu9Vnj4hjt73RteC01hb1nTfVZ6lkZP2JmvbHaveG5XLS3aX27S6zBnuw34muCznOMEuc5KK95MRM9kTaI7y6DSWu2j6M/nldJfUw66Vt9W0vNXiz3ppslvBrZNdhp47/AC6tM01r3icRnDDr5LW920ntXyXrcI+G/tN7Fo61626qrUcSvfpTpH6tcpq5ve3vbe9t9Zv1qqLW3bJq7oCzFSTycKk/OsfPsj+Z46jVVwxtHWf73bOj0F9TO89K/H4/J6PhcNCmuNVSUYxWXeUd7zeeaXVYsVcdYrWNognIxZsLYACgUCgUAAAAAAAAAAAQDiAAgADmmBjsrBPV0GnNXKcT5zXR2crI5Zvv60bOHU2x9PBqZ9JXJ18Wi6U1axNDbcHZD/MrTksu1cV8O0sseox38dpVWXS5MfhvHk6Z1Hts1nB0LqI2Q5xUluUppdSlJIjkg5p+J0Ge97+/eTFWEyzQpMoqwmXY4DR1t0tmmuU31xXmrvfBC16Uje07FMV8s7Ujdu2g9S0srMW0+aqj9HxfP++JX5tfM9MfTzW2m4VEfay9fLw/luEIxhFRglGK3JLcV0zM9ZXVaxEbQxykQlikwhxAoFAqAoFAAAAAAAAAAAEAjAgACAQDmpASUUwlilSN0TES63G6Cw12+2mLfpJbMvtLee1NRenaWvk0uO/eHUX6kYd/QnZX2ZqS96NiuuvHfZq24dSe0zD5/wDkSPK+XjFGf+vn4PP/ABkfelnp1Eqz866x+qor8CJ19vCITHC6+Np/R22C1Swde919I/8AuNyXse73HjbWZbeP5PenD8NfDf59Xe0UwgsoRUUuCSyNabTPduxWI6QyOZDJilMDG2EIBQKgKBQKAAAAAAAAAAAABgQCAQCAAIBUwOSkBdwSZICqKAqyAbQEcwODkEOIFAAUCoCgUAAAAAAAAAAAAAAABAJkBAGQEyAATIABcwG0AzAmYAABQKAAuQFAAUAAAAAAAAAAAAAAAAAgEAAQABAAAAAAAAKAAAXIC5AAKAAAAAAAAAAAAAAAAAAAEAATIAwIAAAAAAC5AQC5AAKBQAAAAAAAAAAB/9k=",
    status: randomArray(['success', 'warning', 'danger'])
});




const getListClass = (isDraggedOver) =>
    classNames(classes['list'], {
        [classes['list--drag-over']]: isDraggedOver
    });

const getItemClass = (isDragging) =>
    classNames(classes['list-group-item'], {
        [classes['list-group-item--dragging']]: isDragging
    });
const initialState = {
    listAItems: _.times(3, generateItem1),
    // listAItems: _.times(1, generateItem2),
    // listBItems: _.times(listB),
    listBItems: _.times(3, generateItem2),
    listCItems: _.times(3, generateItem3),
    listDItems: _.times(4, generateItem4),

    // listAItems: _.times(3,listA),
    // listBItems: _.times(4,listB),
    // listCItems: _.times(5,listC),

    lists: [
        { id: 'listA', title: 'All Candidates' },
        { id: 'listB', title: 'Candidates Interview' },
        { id: 'listC', title: 'Candidates Testing' },
        { id: 'listD', title: 'Hosterlink' }
    ]
   
};
const RowList = (props) => (
    <Card className={props.className}>
        <CardHeader className="bg-none">
            <CardTitle className="h6 mb-0">
                { props.title }
            </CardTitle>
        </CardHeader>
        <Droppable
            droppableId={ props.listId }
            direction="horizontal"
        >
            {(provided, snapshot) => (
                <div
                    className={`card-body d-flex ${getListClass(snapshot.isDraggingOver)}`}
                    style={{ overflowX: 'auto' }}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    {_.map(props.items, (item, index) => (
                        <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                        >
                            {(provided) => (
                                <div
                                    className="px-3"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                >
                                    <Avatar.Image
                                        key={`avatar-${item.id}`}
                                        size="lg"
                                        className="d-block"
                                        src={ item.avatarUrl }
                                        addOns={[
                                            <AvatarAddOn.Icon 
                                                className="fa fa-circle"
                                                color="white"
                                                key="avatar-icon-bg"
                                            />,
                                            <AvatarAddOn.Icon 
                                                className="fa fa-circle"
                                                color={ item.status }
                                                key="avatar-icon-fg"
                                            />
                                        ]}
                                    />
                                </div>
                            )}
                        </Draggable>
                    ))}
                    { provided.placeholder }
                </div>
            )}
        </Droppable>
    </Card>
)
RowList.propTypes = {
    listId: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    className: PropTypes.stirng
}
const VerticalList = React.memo((props) => {
    return (
        <Droppable droppableId={ props.listId }>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    className={`list-group list-group-flush flex-grow-1 ${getListClass(snapshot.isDraggingOver)}`}
                >                    
                    {props.items.map((item, index) => (
                        <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}>
                            {(provided, draggableSnapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`list-group-item ${getItemClass(draggableSnapshot.isDragging)}`}
                                >
                                    <Media>
                                        <Media left className="align-self-center pr-3">
                                            <i className="fa fa-ellipsis-v text-muted" />
                                        </Media>
                                        <Media left middle className="mr-4 align-self-center">
                                            <Avatar.Image
                                                size="md"
                                                className="d-block"
                                                src={ item.avatarUrl }
                                                addOns={[
                                                    <AvatarAddOn.Icon 
                                                        className="fa fa-circle"
                                                        color="white"
                                                        key="avatar-icon-bg"
                                                    />,
                                                    <AvatarAddOn.Icon 
                                                        className="fa fa-circle"
                                                        color={ item.status }
                                                        key="avatar-icon-fg"
                                                    />
                                                ]}
                                            /> 
                                        </Media>
                                        <Media body>
                                            <span className="mt-0 h6 mb-1">
                                                { item.name }
                                            </span>
                                            <p className="mb-0 text-muted text-truncate">
                                                { item.title }
                                            </p>
                                        </Media>
                                    </Media>
                                </div>
                            )}
                        </Draggable>
                    ))}
                </div>
            )}
        </Droppable>
    );
});
VerticalList.propTypes = {
    items: PropTypes.array,
    listId: PropTypes.string,
    title: PropTypes.string
}
class Column extends React.Component {
    static propTypes = {
        children: PropTypes.node,
        id: PropTypes.string,
        index: PropTypes.number,
        title: PropTypes.string
    }

    render() {
        const { children, id, index, title } = this.props;

        return (
            <Draggable
                draggableId={id}
                index={index}
            >
                {(provided) => (
                    <div
                        className="col-md-4"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                    >
                        <Card className="h-100">
                            <CardHeader {...provided.dragHandleProps} className="b-0 bg-none">
                                <CardTitle className="h6 mb-0">
                                    <i className="fa fa-ellipsis-v mr-3 text-muted" />
                                    { title }
                                </CardTitle>
                            </CardHeader>
                            { children }
                        </Card>
                    </div>
                )}
            </Draggable>
        )
    }
}




class Testing extends  React.Component{
    static propTypes = {
        className: PropTypes.string
    }
    state = _.clone(initialState);

    constructor (props) {
        super(props);

        this.onDragEnd = this.onDragEnd.bind(this);
    }
    onDragEnd(result) {
        const { source, destination } = result;

        // Swap column positions
        if (source.droppableId === 'board') {
            if (destination.droppableId !== 'board') {
                return;
            }
            const lists = reorder(
                this.state.lists,
                source.index,
                destination.index
            );

            this.setState({ lists });
            return;
        }

        // dropped outside the list
        if (!destination) {
            return;
        }

        // Handle List Items
        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                this.state[`${source.droppableId}Items`],
                source.index,
                destination.index
            );

            this.setState({
                [`${source.droppableId}Items`]: items
            });
        } else {
            const result = move(
                this.state[`${source.droppableId}Items`],
                this.state[`${destination.droppableId}Items`],
                source,
                destination
            );

            this.setState(_.mapKeys(result, (val, key) => `${key}Items`));
        }
    }

    recoverInitialState() {
        this.setState(initialState);
    }

    render(){
        const { className } = this.props;
        const { lists } = this.state;
       
       
        return(
            <div className={ className }>
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable
                    droppableId="board"
                    type="COLUMN"
                    direction="horizontal"
                >
                    {(provided) => (
                        <div
                            className="row"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {_.map(lists, (list, index) => (
                                <Column
                                    id={list.id}
                                    index={ index }
                                    title={list.title}
                                    key={ list.id }
                                >
                                    <VerticalList
                                        listId={list.id}
                                        items={this.state[`${list.id}Items`]}
                                    />
                                </Column>
                            ))}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>

        )
    }
} 
export default Testing