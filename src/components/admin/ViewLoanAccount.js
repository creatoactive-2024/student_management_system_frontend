import React from 'react'
import "../admin-styles/viewAccount.css";
import { ExclamationCircleOutlined, EditOutlined, SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';


const ViewLoanAccount = () => {
  return (
    <>
<h1>ViewAccount</h1>
        <div >
           
            <table id="customers" style={{ overflowX: 'auto' }}>
  <tr>
    <th>Company</th>
    <th>Contact</th>
    <th>Country</th>
    <th>Action</th>

  </tr>
  <tr>
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
    <td>Germany</td>
    <td>
                  <div className="button_container">
                    <Link>
                      <button className=""  >
                        <EditOutlined />
                      </button>
                    </Link>

                    <button className="" >
                      <DeleteOutlined />
                    </button>
                  </div>
                </td>
  </tr>
  <tr>
    <td>Berglunds snabbköp</td>
    <td>Christina Berglund</td>
    <td>Sweden</td>
    <td>
                  <div className="button_container">
                    <Link>
                      <button className=""  >
                        <EditOutlined />
                      </button>
                    </Link>

                    <button className="" >
                      <DeleteOutlined />
                    </button>
                  </div>
                </td>
    
  </tr>
  <tr>
    <td>Centro comercial Moctezuma</td>
    <td>Francisco Chang</td>
    <td>Mexico</td>
    <td>
                  <div className="button_container">
                    <Link>
                      <button className=""  >
                        <EditOutlined />
                      </button>
                    </Link>

                    <button className="" >
                      <DeleteOutlined />
                    </button>
                  </div>
                </td>
  </tr>
  <tr>
    <td>Ernst Handel</td>
    <td>Roland Mendel</td>
    <td>Austria</td>
    <td>
                  <div className="button_container">
                    <Link>
                      <button className=""  >
                        <EditOutlined />
                      </button>
                    </Link>

                    <button className="" >
                      <DeleteOutlined />
                    </button>
                  </div>
                </td>
  </tr>
  <tr>
    <td>Island Trading</td>
    <td>Helen Bennett</td>
    <td>UK</td>
    <td>
                  <div className="button_container">
                    <Link>
                      <button className=""  >
                        <EditOutlined />
                      </button>
                    </Link>

                    <button className="" >
                      <DeleteOutlined />
                    </button>
                  </div>
                </td>
  </tr>
  <tr>
    <td>Königlich Essen</td>
    <td>Philip Cramer</td>
    <td>Germany</td>
    <td>
                  <div className="button_container">
                    <Link>
                      <button className=""  >
                        <EditOutlined />
                      </button>
                    </Link>

                    <button className="" >
                      <DeleteOutlined />
                    </button>
                  </div>
                </td>
  </tr>
  <tr>
    <td>Laughing Bacchus Winecellars</td>
    <td>Yoshi Tannamuri</td>
    <td>Canada</td>
    <td>
                  <div className="button_container">
                    <Link>
                      <button className=""  >
                        <EditOutlined />
                      </button>
                    </Link>

                    <button className="" >
                      <DeleteOutlined />
                    </button>
                  </div>
                </td>
  </tr>
  <tr>
    <td>Magazzini Alimentari Riuniti</td>
    <td>Giovanni Rovelli</td>
    <td>Italy</td>
    <td>
                  <div className="button_container">
                    <Link>
                      <button className=""  >
                        <EditOutlined />
                      </button>
                    </Link>

                    <button className="" >
                      <DeleteOutlined />
                    </button>
                  </div>
                </td>
  </tr>
  <tr>
    <td>North/South</td>
    <td>Simon Crowther</td>
    <td>UK</td>
    <td>
                  <div className="button_container">
                    <Link>
                      <button className=""  >
                        <EditOutlined />
                      </button>
                    </Link>

                    <button className="" >
                      <DeleteOutlined />
                    </button>
                  </div>
                </td>
  </tr>
  <tr>
    <td>Paris spécialités</td>
    <td>Marie Bertrand</td>
    <td>France</td>
    <td>
                  <div className="button_container">
                    <Link>
                      <button className=""  >
                        <EditOutlined />
                      </button>
                    </Link>

                    <button className="" >
                      <DeleteOutlined />
                    </button>
                  </div>
                </td>
  </tr>
</table>
        </div>
        </>
  )
}

export default ViewLoanAccount