const Dashboard = () => {
  return (
    <div className="px-6 xl:px-0">
      <div className="stats shadow w-full ">
        <div className="stat">
          <div className="stat-figure text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-8 w-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Total Products</div>
          <div className="stat-value text-primary">25.6K</div>
          <div className="stat-desc">Update to every single day</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-8 w-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Active Products</div>
          <div className="stat-value text-secondary">2.6M</div>
          {/* <div className="stat-desc">21% more than last month</div> */}
        </div>
        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </div>
          <div className="stat-title">Total Orders</div>
          <div className="stat-value text-secondary">2.6M</div>
          {/* <div className="stat-desc">21% more than last month</div> */}
        </div>
      </div>
      <div className="my-16">
        <h2 className="text-2xl font-semibold">Recent Order </h2>
        <div className="h-full overflow-auto">
          <div className="overflow-x-auto over">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Address</th>
                  <th>Product Title</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr>
                  <th>1</th>
                  <td>Cy Ganderton</td>
                  <td>01784099162</td>
                  <td>Thakurgaon</td>
                  <td>Tree Plants</td>
                  <td>
                    <span>200 </span>$
                  </td>
                </tr>
                <tr>
                  <th>1</th>
                  <td>Cy Ganderton</td>
                  <td>01784099162</td>
                  <td>Thakurgaon</td>
                  <td>Tree Plants</td>
                  <td>
                    <span>200 </span>$
                  </td>
                </tr>
                <tr>
                  <th>1</th>
                  <td>Cy Ganderton</td>
                  <td>01784099162</td>
                  <td>Thakurgaon</td>
                  <td>Tree Plants</td>
                  <td>
                    <span>200 </span>$
                  </td>
                </tr>
                <tr>
                  <th>1</th>
                  <td>Cy Ganderton</td>
                  <td>01784099162</td>
                  <td>Thakurgaon</td>
                  <td>Tree Plants</td>
                  <td>
                    <span>200 </span>$
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="my-16">
        <h2 className="text-2xl font-semibold">Recent Active Products </h2>
        <div className="h-full overflow-auto">
          <div className="overflow-x-auto over">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Address</th>
                  <th>Product Title</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr>
                  <th>1</th>
                  <td>Cy Ganderton</td>
                  <td>01784099162</td>
                  <td>Thakurgaon</td>
                  <td>Tree Plants</td>
                  <td>
                    <span>200 </span>$
                  </td>
                </tr>
                <tr>
                  <th>1</th>
                  <td>Cy Ganderton</td>
                  <td>01784099162</td>
                  <td>Thakurgaon</td>
                  <td>Tree Plants</td>
                  <td>
                    <span>200 </span>$
                  </td>
                </tr>
                <tr>
                  <th>1</th>
                  <td>Cy Ganderton</td>
                  <td>01784099162</td>
                  <td>Thakurgaon</td>
                  <td>Tree Plants</td>
                  <td>
                    <span>200 </span>$
                  </td>
                </tr>
                <tr>
                  <th>1</th>
                  <td>Cy Ganderton</td>
                  <td>01784099162</td>
                  <td>Thakurgaon</td>
                  <td>Tree Plants</td>
                  <td>
                    <span>200 </span>$
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
