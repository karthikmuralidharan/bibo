import React from 'react';

interface Props {
    inPercent: number;
    outPercent: number;
}

export default function Report({ inPercent, outPercent }: Props) {
    return (
        <div>
            <p>Thank You!!</p>
            <br />
            <table>
                <tbody>
                    <tr>
                        <th>IN</th>
                        <td>{inPercent}</td>
                    </tr>
                    <tr>
                        <th>OUT</th>
                        <td>{outPercent}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
