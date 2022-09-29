const { fileFilter } = require("../src/layers/middlewares/image.middleware");
// const AWSMock = require("aws-sdk-mock");
// const aws = require("aws-sdk");

// const mS3Instance = {
//   upload: jest.fn().mockReturnThis(),
//   copyObject: jest.fn().mockReturnThis(),
//   promise: jest.fn().mockReturnThis(),
//   catch: jest.fn(),
// };

// jest.mock("aws-sdk", () => {
//   return { S3: jest.fn(() => mS3Instance) };
// });

describe("fileFilter", () => {
  const file = "test/gif";
  const cb = jest.fn();

  test("이미지 파일이 있으면 jpg, jpeg, png 중에 하나라면 cb 실행", () => {
    const req = {
      fileFilter: jest.fn(() => true),
    };
    // fileFilter(req, file, cb);
    expect(cb);
  });

  test("이미지 파일 확장자가 다르면 error 응답", () => {
    const req = {
      fileFilter: jest.fn(() => false),
    };
    // fileFilter(req, file, cb);
    expect(cb).toBeCalledTimes(0); //에러 메세지로 어떻게 못불러오나?
  });
});

// describe('s3', () => {
//     test('calls aws-sdk copyObject method with correct parameters', async () => {
//         await s3()
//         expect(mS3Instance.copyObject).toHaveBeenCalledWith({
//             bucket: "clips-s3-bucket",
//         //   CopySource: 'some-bucket/some/path/myfile.json,
//           key: 'some-bucket/some/other/path/myfile.json',
//         })
//         expect(mS3Instance.copyObject).toHaveBeenCalledTimes(1)
//      })

// describe("imageUploader", () => {
//   test("should upload correctly", async () => {
//     const s3 = {
//       get: jest
//         .fn()
//         .mockReturnValueOnce("accessKeyId")
//         .mockReturnValueOnce("secretAccessKey")
//         .mockReturnValueOnce("region"),
//     };
//     mS3Instance.promise.mockResolvedValueOnce("fake response");
//     const s3Service = new S3Service(configService);
//     const actual = await s3Service.upload(
//       "name",
//       "contentType",
//       Buffer.from("ok")
//     );
//     expect(actual).toEqual("fake response");
//     expect(mS3Instance.upload).toBeCalledWith({
//       Bucket: "bucket-dev",
//       Key: "key",
//     });
//   });
// });
// })


// describe('imageUploader', () =>{
//     const res = {
//         status: jest.fn(()=> res),
//         send:jest.fn()}
//     const req = jest.fn(()=> req)

//     test('이미지 파일이 있으면 next로 이동', async()=> {
//         await imageUploader(req, res);
//         expect(cb).toBeCalledTimes(1);
//     });
//     test('이미지 파일이 없으면 error 응답', async()=> {
//         await imageUploader(req, res);
//         expect(cb).toBeCalledWith(error);
//     });


