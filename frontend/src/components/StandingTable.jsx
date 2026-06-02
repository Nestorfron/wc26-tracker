export default function StandingTable({
    teams,
  }) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-zinc-800">
            <tr>
              <th className="p-3 text-left">
                Equipo
              </th>
  
              <th>PTS</th>
              <th>PJ</th>
              <th>DG</th>
            </tr>
          </thead>
  
          <tbody>
            {teams.map((team) => (
              <tr
                key={team.id}
                className="border-t border-zinc-800"
              >
                <td className="p-3">
                  {team.name}
                </td>
  
                <td className="text-center">
                  {team.points}
                </td>
  
                <td className="text-center">
                  {team.played}
                </td>
  
                <td className="text-center">
                  {team.goalDiff}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }